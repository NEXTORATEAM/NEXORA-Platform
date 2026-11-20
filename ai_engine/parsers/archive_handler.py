import os
import sys

# ضبط المسار لضمان رؤية ملف pipeline في مجلد AI_ENGINE الرئيسي
current_dir = os.path.dirname(os.path.abspath(__file__))
ai_engine_dir = os.path.abspath(os.path.join(current_dir, "../"))
if ai_engine_dir not in sys.path:
    sys.path.insert(0, ai_engine_dir)

import zipfile
import shutil
import tempfile
from pipeline import process_resume

def process_resume_zip(zip_path: str) -> dict:
    """
    معالجة ملف ZIP يضم مجموعة من السير الذاتية (Batch Processing) 
    بشكل آمن ومهيأ للإنتاج والربط مع الـ Backend في منصة NEXORA.
    """
    if not os.path.exists(zip_path):
        return {"success": False, "error": "The ZIP file does not exist at the specified path."}

    results = []
    success_count = 0
    failed_count = 0

    # استخدام مجلد مؤقت آمن وفريد لكل عملية معالجة لتجنب تداخل الملفات
    temp_dir = tempfile.mkdtemp()
    
    try:
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)
            
        # المرور على كافة الملفات المفكوكة داخل المجلد المؤقت
        for root, dirs, files in os.walk(temp_dir):
            for file in files:
                file_path = os.path.join(root, file)
                
                # تخطي ملفات النظام المخفية مثل __MACOSX أو .DS_Store
                if file.startswith('.'):
                    continue
                
                # التحقق من الصيغ المدعومة
                if file.lower().endswith(('.pdf', '.docx')):
                    try:
                        # تشغيل الـ Pipeline لكل سيرة ذاتية بشكل مستقل وآمن
                        res = process_resume(file_path)
                        if res.get("success"):
                            success_count += 1
                        else:
                            failed_count += 1
                            
                        results.append({
                            "file_name": file,
                            "processing_status": res
                        })
                    except Exception as inner_e:
                        failed_count += 1
                        results.append({
                            "file_name": file,
                            "processing_status": {"success": False, "error": f"Internal error occurred during processing: {str(inner_e)}"}
                        })
                else:
                    failed_count += 1
                    results.append({
                        "file_name": file,
                        "processing_status": {"success": False, "error": "The file format is not supported (only PDF and DOCX are allowed)"}
                    })
                    
    except zipfile.BadZipFile:
        return {"success": False, "error": "The ZIP file is corrupted or invalid."}
    except Exception as e:
        return {"success": False, "error": f"Error occurred while extracting and processing the ZIP file: {str(e)}"}
    
    # تنظيف المجلد المؤقت نهائياً بعد انتهاء العملية
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)
            
    return {
        "success": True,
        "total_processed": success_count + failed_count,
        "successful_resumes": success_count,
        "failed_resumes": failed_count,
        "details": results
    }

if __name__ == "__main__":
    # اختبار النسخة المعتمدة
    zip_sample = "data/sample_cvs/ZIP_archive.zip"
    print(f"-> Processing ZIP file using the production-ready version...")
    output = process_resume_zip(zip_sample)
    print(output)