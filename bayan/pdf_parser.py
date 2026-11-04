import pdfplumber
import os

def extract_text_from_pdf(file_path: str) -> dict:
    """
    مهمة العضوة الأولى: استخراج النصوص من ملفات PDF للسير الذاتية
    باستخدام مكتبة pdfplumber مع فحص جودة الاستخراج.
    """
    if not os.path.exists(file_path):
        return {"success": False, "error": "الملف غير موجود في المسار المحدد."}
    
    extracted_text = ""
    pages_count = 0
    
    try:
        with pdfplumber.open(file_path) as pdf:
            pages_count = len(pdf.pages)
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    extracted_text += text + "\n"
                    
        # فحص جودة الاستخراج المبدئي (Extraction Quality Check)
        if len(extracted_text.strip()) < 50:
            quality_status = "Low"  # قد يشير إلى أن الملف مسحوب ضوئياً (Scanned PDF) ويحتاج OCR
        else:
            quality_status = "High"
            
        return {
            "success": True,
            "file_type": "PDF",
            "pages": pages_count,
            "text": extracted_text.strip(),
            "extraction_quality": quality_status
        }
    except Exception as e:
        return {
            "success": False,
            "error": f"حدث خطأ أثناء قراءة ملف الـ PDF: {str(e)}"
        }

# مثال تجريبي للاختبار المباشر
if __name__ == "__main__":
    sample_path = "../../data/sample_cvs/Ashraf Al-Aghbari - Resume.pdf"
    result = extract_text_from_pdf(sample_path)
    print(result)