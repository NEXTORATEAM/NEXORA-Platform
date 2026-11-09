from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models.job_post import Job
from app.db.models.screening_batch import ScreeningBatch, BatchStatus
from app.db.models.analysis_result import AnalysisResult
from app.db.models.analysis import ResumeAnalysis
from app.schemas.analysis import AIAnalysisInput
from app.services.file_service import extract_zip_batch
from app.services.ai_client import analyze_resume_and_match

router = APIRouter()

@router.post("/save-analysis", status_code=status.HTTP_201_CREATED)
def save_resume_analysis(data: AIAnalysisInput, db: Session = Depends(get_db)):
    """
    حفظ نتائج استخراج مفردة للسيرة الذاتية في قاعدة البيانات.
    """
    try:
        extracted = data.extracted_data
        personal = extracted.personal_info or {}

        # تحويل بيانات التعليم والمشاريع إلى قائمة لـ JSON
        education_list = [edu.dict() for edu in extracted.education] if extracted.education else []
        projects_list = [proj.dict() for proj in extracted.projects] if extracted.projects else []

        # إنشاء سجل جديد في قاعدة البيانات
        analysis_record = ResumeAnalysis(
            file_name=data.file_name,
            full_name=personal.get("full_name"),
            email=personal.get("email"),
            phone=personal.get("phone"),
            experience_years=extracted.experience_years,
            skills=extracted.skills,
            education=education_list,
            projects=projects_list,
            extraction_quality=data.extraction_quality
        )

        db.add(analysis_record)
        db.commit()
        db.refresh(analysis_record)

        return {
            "message": "Resume analysis saved successfully",
            "analysis_id": analysis_record.id
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save analysis: {str(e)}"
        )


@router.post("/upload-zip", status_code=status.HTTP_201_CREATED)
async def upload_and_process_zip_batch(
    job_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    استقبال ملف ZIP محمل بالسير الذاتية، فك ضغطه، تحليله بمحرك الذكاء الاصطناعي،
    وحفظ نتائج المطابقة في قاعدة البيانات.
    """
    # 1. التثبت من وجود الوظيفة ومستلزماتها
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="الوظيفة غير موجودة في قاعدة البيانات.")

    job_requirements = f"{job.description} {job.requirements}"
    job_skills_list = [s.strip() for s in (job.requirements or "").split(",") if s.strip()]

    # 2. تسجيل دفعة تقييم جديدة
    new_batch = ScreeningBatch(
        job_id=job.id,
        zip_filename=file.filename,
        status=BatchStatus.PROCESSING
    )
    db.add(new_batch)
    db.commit()
    db.refresh(new_batch)

    # 3. فك الضغط واستخراج مسارات السير الذاتية
    extracted_files = extract_zip_batch(file, new_batch.id)
    new_batch.total_files = len(extracted_files)

    # 4. تحليل كل ملف بحساب الـ ATS Match Score
    for file_path in extracted_files:
        ai_res = analyze_resume_and_match(
            file_path=file_path,
            job_requirements=job_requirements,
            job_skills=job_skills_list
        )

        if ai_res.get("success"):
            result_record = AnalysisResult(
                batch_id=new_batch.id,
                ats_score=ai_res.get("ats_score", 0.0),
                matched_skills=", ".join(ai_res.get("matched_skills", [])),
                missing_skills=", ".join(ai_res.get("missing_skills", [])),
                summary=ai_res.get("summary", "")
            )
            db.add(result_record)

    new_batch.status = BatchStatus.COMPLETED
    db.commit()

    return {
        "message": "تم رفع وتصفية الملفات بنجاح",
        "batch_id": new_batch.id,
        "processed_files": len(extracted_files)
    }