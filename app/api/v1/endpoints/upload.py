import os
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.db.models.resume import Resume

router = APIRouter(tags=["File Upload"])

# تحديد مجلد الحفظ المحلي للملفات
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-resume")
def upload_resume(file: UploadFile = File(...), user_id: int = 1, db: Session = Depends(get_db)):
    """
    استقبال ملف السيرة الذاتية (PDF, DOCX، أو صور)، حفظه محلياً، وتسجيل بياناته في قاعدة البيانات.
    """
    # التحقق من صيغة الملف (السماح بـ PDF, DOCX، والصور)
    allowed_extensions = [".pdf", ".docx", ".png", ".jpg", ".jpeg"]
    file_ext = os.path.splitext(file.filename)[1].lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400, 
            detail="Invalid file type. Only PDF, DOCX, and image files (PNG, JPG, JPEG) are allowed."
        )
    
    # مسار حفظ الملف محلياً
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    try:
        # حفظ الملف في المجلد
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # حفظ بيانات الملف في قاعدة البيانات (جدول السير الذاتية)
        db_resume = Resume(
            filename=file.filename,
            file_path=file_path,
            user_id=user_id
        )
        db.add(db_resume)
        db.commit()
        db.refresh(db_resume)
        
        return {
            "status": "success",
            "message": "File uploaded and saved successfully",
            "file_id": db_resume.id,
            "filename": db_resume.filename,
            "file_path": db_resume.file_path
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while uploading the file: {str(e)}")