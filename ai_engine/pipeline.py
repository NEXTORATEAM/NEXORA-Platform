from ai_engine.parsers.pdf_parser import extract_text_from_pdf
from ai_engine.parsers.docx_parser import extract_text_from_docx
from ai_engine.nlp.ner_extractor import extract_resume_entities


def process_resume(file_path: str) -> dict:
    """
    دالة الدمج الشاملة في منصة NEXORA:
    تقرأ ملف السيرة الذاتية (PDF أو DOCX) ثم تستخرج المهارات والكيانات بواسطة spaCy.
    """
    # 1. التمييز بين صيغ الملفات واستخراج النص الخام
    if file_path.endswith(".pdf"):
        parsed_result = extract_text_from_pdf(file_path)
    elif file_path.endswith(".docx"):
        parsed_result = extract_text_from_docx(file_path)
    else:
        return {"success": False, "error": "صيغة الملف غير مدعومة."}

    # التحقق من نجاح عملية القراءة
    if not parsed_result.get("success"):
        return parsed_result

    raw_text = parsed_result.get("text", "")

    # 2. تمرير النص المستخرج لدالة spaCy لاستخراج المهارات والكيانات
    nlp_entities = extract_resume_entities(raw_text)

    # 3. تجميع كافة البيانات في هيكل الـ JSON النهائي المتفق عليه
    return {
        "success": True,
        "file_type": parsed_result.get("file_type"),
        "extraction_quality": parsed_result.get("extraction_quality"),
        "extracted_data": {
            "skills": nlp_entities.get("skills"),
            "organizations": nlp_entities.get("organizations"),
            "degrees": nlp_entities.get("degrees"),
            "full_text": raw_text
        }
    }

# مثال تجريبي للاختبار المباشر للسلسلة الكاملة
if __name__ == "__main__":
    # مسار تجريبي لملف وورد أو بي دي إف لديكِ
    sample_path = "data/sample_cvs/Azhar_Raji_CV_Updated.docx"
    
    final_output = process_resume(sample_path)
    print("--- النتيجة النهائية لعملية المعالجة المتكاملة ---")
    print(final_output)