import os
import sys

# ضمان توافق المسارات للمشروع
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

# استيراد خط المعالجة ووحدة التخزين المتجهي بالتوافق مع الهيكل الحالي
from pipeline import process_resume
from nlp.vector_store import NEXORAVectorStore

class ResumeIngestionManager:
    """
    إدارة عملية إدخال السير الذاتية الحقيقية: 
    معالجة الملف عبر الـ Pipeline ثم تخزينها تلقائياً في ChromaDB.
    """
    def __init__(self):
        self.vector_store = NEXORAVectorStore()

    def ingest_single_resume(self, file_path: str, resume_id: str, candidate_name: str):
        """
        معالجة ملف حقيقي (PDF/DOCX) وتخزينه في قاعدة البيانات المتجهية.
        """
        print(f"جاري معالجة السيرة الذاتية للملف: {file_path}...")
        
        # 1. تشغيل الـ Pipeline واستخراج البيانات والنص الخام
        result = process_resume(file_path)
        
        if not result.get("success", False):
            print("فشل في معالجة واستخراج بيانات السيرة الذاتية.")
            return False

        extracted_data = result.get("extracted_data", {})
        full_text = extracted_data.get("full_text", "")
        
        if not full_text:
            print("النص المستخرج فارغ.")
            return False

        # 2. تجهيز البيانات الوصفية (Metadata) مع المهارات المستخرجة
        metadata = {
            "name": candidate_name,
            "file_type": result.get("file_type", "UNKNOWN"),
            "skills": ", ".join(extracted_data.get("skills", [])),
            "degrees": ", ".join(extracted_data.get("degrees", []))
        }

        # 3. حفظ النص والمتجهات في ChromaDB
        success = self.vector_store.add_resume(
            resume_id=resume_id,
            resume_text=full_text,
            metadata=metadata
        )

        if success:
            print(f"تم تخزين السيرة الذاتية ({resume_id}) بنجاح في ChromaDB!")
        return success

# تجربة عملية للاختبار المباشر
if __name__ == "__main__":
    manager = ResumeIngestionManager()
    
    # مسار الملف التجريبي بناءً على الملفات المرفقة
    sample_path = "./data/sample_cvs/Ashraf Al-Aghbari - Resume.pdf" 
    
    if os.path.exists(sample_path):
        manager.ingest_single_resume(sample_path, "res_001", "Azhar Al-Harwi")
    else:
        print(f"تنبيه: مسار الملف غير موجود تأكد من المسار: {sample_path}")