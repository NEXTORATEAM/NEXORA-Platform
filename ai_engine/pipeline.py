import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from ai_engine.parsers.pdf_parser import extract_text_from_pdf
from ai_engine.parsers.docx_parser import extract_text_from_docx
from ai_engine.nlp.ner_extractor import extract_resume_entities
from ai_engine.nlp.text_cleaner import clean_text, extract_contact_info


def process_resume(file_path: str, job_requirements: list = None) -> dict:
    """
    معالجة السيرة الذاتية المرفوعة ديناميكياً (PDF أو DOCX) واستخراج بيانات التواصل والمهارات.
    """
    lower_path = file_path.lower()
    if lower_path.endswith(".pdf"):
        parsed_result = extract_text_from_pdf(file_path)
    elif lower_path.endswith(".docx"):
        parsed_result = extract_text_from_docx(file_path)
    else:
        return {"success": False, "error": "Unsupported file format."}

    if not parsed_result.get("success"):
        return parsed_result

    raw_text = parsed_result.get("text", "")

    # تنظيف النص الخام
    cleaned_text = clean_text(raw_text)

    # استخراج معلومات التواصل (الايميل والهاتف)
    contact_info = extract_contact_info(cleaned_text)

    # استخراج الكيانات والمهارات ديناميكياً
    nlp_entities = extract_resume_entities(cleaned_text, dynamic_skills=job_requirements)

    return {
        "success": True,
        "file_type": parsed_result.get("file_type"),
        "extraction_quality": parsed_result.get("extraction_quality"),
        "contact_info": contact_info,
        "extracted_data": {
            "skills": nlp_entities.get("skills"),
            "organizations": nlp_entities.get("organizations"),
            "degrees": nlp_entities.get("degrees"),
            "full_text": cleaned_text,
        },
    }