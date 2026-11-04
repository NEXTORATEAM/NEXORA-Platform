import zipfile
import io
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models.user import User
from app.db.models.screening_batch import ScreeningBatch, BatchStatusEnum
from app.core.security import get_current_user

router = APIRouter()

@router.post("/upload-zip", status_code=status.HTTP_201_CREATED)
async def upload_zip_batch(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 1. التحقق من امتداد الملف
    if not file.filename.endswith(".zip"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only .zip files are allowed"
        )

    # 2. قراءة محتوى ملف الـ ZIP في الذاكرة
    contents = await file.read()
    try:
        with zipfile.ZipFile(io.BytesIO(contents)) as z:
            file_names = z.namelist()
            valid_files = [
                f for f in file_names 
                if f.lower().endswith(('.pdf', '.docx', '.doc')) and not f.startswith('__MACOSX')
            ]
            
            total_count = len(valid_files)

            if total_count == 0:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="No valid PDF or Word documents found inside the ZIP file"
                )

            # 3. إنشاء سجل الدفعة في قاعدة البيانات مع اسم ملف الـ ZIP وحالته الصحيحة
            new_batch = ScreeningBatch(
                recruiter_id=current_user.id,
                status=BatchStatusEnum.PROCESSING,
                total_files=total_count,
                zip_filename=file.filename
            )
            db.add(new_batch)
            db.commit()
            db.refresh(new_batch)

            return {
                "message": "ZIP file uploaded successfully and batch processing started",
                "batch_id": new_batch.id,
                "total_files_found": total_count,
                "status": new_batch.status
            }

    except zipfile.BadZipFile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or corrupted ZIP file"
        )

@router.get("/{batch_id}", status_code=status.HTTP_200_OK)
async def get_batch_status(
    batch_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 1. البحث عن الدفعة في قاعدة البيانات مع التأكد أنها تخص المستخدم الحالي
    batch = db.query(ScreeningBatch).filter(
        ScreeningBatch.id == batch_id,
        ScreeningBatch.recruiter_id == current_user.id
    ).first()

    if not batch:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Batch not found or unauthorized"
        )

    # 2. إرجاع تفاصيل الحالة والتقدم
    return {
        "batch_id": batch.id,
        "zip_filename": batch.zip_filename,
        "status": batch.status,
        "total_files": batch.total_files,
        "created_at": batch.created_at
    }