from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models.analysis import ResumeAnalysis
from app.schemas.analysis import AIAnalysisInput

router = APIRouter()

@router.post("/save-analysis", status_code=status.HTTP_201_CREATED)
def save_resume_analysis(data: AIAnalysisInput, db: Session = Depends(get_db)):
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