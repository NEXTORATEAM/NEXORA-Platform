from docx import Document
import os

def extract_text_from_docx(file_path: str) -> dict:
    """
    مهمة العضوة الأولى: استخراج النصوص من ملفات السيرة الذاتية بصيغة Word (.docx)
    باستخدام مكتبة python-docx.
    """
    if not os.path.exists(file_path):
        return {"success": False, "error": "الملف غير موجود في المسار المحدد."}
    
    extracted_text = ""
    paragraphs_count = 0
    
    try:
        doc = Document(file_path)
        paragraphs_count = len(doc.paragraphs)
        
        for paragraph in doc.paragraphs:
            if paragraph.text.strip():
                extracted_text += paragraph.text + "\n"
                
        # فحص جودة الاستخراج المبدئي
        if len(extracted_text.strip()) < 50:
            quality_status = "Low"
        else:
            quality_status = "High"
            
        return {
            "success": True,
            "file_type": "DOCX",
            "paragraphs": paragraphs_count,
            "text": extracted_text.strip(),
            "extraction_quality": quality_status
        }
    except Exception as e:
        return {
            "success": False,
            "error": f"حدث خطأ أثناء قراءة ملف الـ Word: {str(e)}"
        }

# مثال تجريبي للاختبار المباشر
if __name__ == "__main__":
    sample_path = "data/sample_cvs/Azhar_Raji_CV_Updated.docx"
    result = extract_text_from_docx(sample_path)
    print(result)