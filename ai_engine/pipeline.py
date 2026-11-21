
import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))

if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from ai_engine.parsers.pdf_parser import extract_text_from_pdf
from ai_engine.parsers.docx_parser import extract_text_from_docx

from ai_engine.nlp.ner_extractor import extract_resume_entities

from ai_engine.nlp.text_cleaner import (
    clean_text,
    extract_contact_info
)


def process_resume(
    file_path: str,
    job_requirements: list = None
) -> dict:
    """
    معالجة السيرة الذاتية واستخراج المعلومات الشخصية
    والمهارات والمؤهلات والمؤسسات من ملفات PDF وDOCX.
    """

    lower_path = file_path.lower()

    # 1. استخراج النص حسب نوع الملف
    if lower_path.endswith(".pdf"):
        parsed_result = extract_text_from_pdf(file_path)

    elif lower_path.endswith(".docx"):
        parsed_result = extract_text_from_docx(file_path)

    else:
        return {
            "success": False,
            "error": "Unsupported file format."
        }

    # 2. التحقق من نجاح استخراج النص
    if not parsed_result.get("success"):
        return parsed_result

    raw_text = parsed_result.get("text", "")

    if not raw_text.strip():
        return {
            "success": False,
            "error": "No readable text found in the resume."
        }

    # 3. تنظيف النص مع الحفاظ على فواصل الأسطر
    cleaned_text = clean_text(raw_text)

    # 4. استخراج البريد الإلكتروني ورقم الهاتف
    contact_info = extract_contact_info(cleaned_text)

    # 5. استخراج بيانات السيرة الذاتية
    nlp_entities = extract_resume_entities(
        cleaned_text,
        dynamic_skills=job_requirements
    )

    # 6. تجهيز البيانات المستخرجة
    extracted_data = {
        "full_name": nlp_entities.get("full_name"),

        "skills": nlp_entities.get("skills", []),

        "organizations": nlp_entities.get(
            "organizations", []
        ),

        "degrees": nlp_entities.get("degrees", []),

        "full_text": cleaned_text
    }

    # 7. إرجاع النتيجة
    return {
        "success": True,

        "file_type": parsed_result.get("file_type"),

        "extraction_quality": parsed_result.get(
            "extraction_quality"
        ),

        "contact_info": contact_info,

        "extracted_data": extracted_data
    }
