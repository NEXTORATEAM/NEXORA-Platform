
import logging
import os
import re
import shutil
from uuid import uuid4

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user

from app.db.models.resume import Resume
from app.db.models.analysis import ResumeAnalysis
from app.db.models.user import User

from ai_engine.pipeline import process_resume


logger = logging.getLogger(__name__)

router = APIRouter(tags=["File Upload"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# --------------------------------------------------
# Helper Functions
# --------------------------------------------------

def _sanitize_filename(filename: str) -> str:
    base_name = os.path.basename(filename or "")
    sanitized = re.sub(r"[^A-Za-z0-9._-]", "_", base_name)
    return sanitized or "resume"


def _remove_file_silently(file_path: str) -> None:
    try:
        if file_path and os.path.exists(file_path):
            os.remove(file_path)
    except OSError as exc:
        logger.warning(
            "Failed to remove uploaded file %s: %s",
            file_path,
            exc
        )


def _sanitize_analysis_for_response(raw_result: dict) -> dict:
    extracted = raw_result.get("extracted_data") or {}

    safe_extracted = {
        key: value
        for key, value in extracted.items()
        if key != "full_text"
    }

    return {
        "file_type": raw_result.get("file_type"),
        "extraction_quality": raw_result.get("extraction_quality"),
        "contact_info": raw_result.get("contact_info"),
        "extracted_data": safe_extracted,
    }


def _clean_string_list(value):
    if not isinstance(value, list):
        return []

    return [
        item.strip()
        for item in value
        if isinstance(item, str) and item.strip()
    ]


# --------------------------------------------------
# Save Analysis in Database
# --------------------------------------------------

def _save_analysis_to_database(
    db: Session,
    resume_id: int,
    filename: str,
    pipeline_result: dict
):
    extracted = pipeline_result.get("extracted_data") or {}
    contact_info = pipeline_result.get("contact_info") or {}

    skills = _clean_string_list(
        extracted.get("skills")
    )

    organizations = _clean_string_list(
        extracted.get("organizations")
    )

    degrees = _clean_string_list(
        extracted.get("degrees")
    )

    full_name = extracted.get("full_name")

    if isinstance(full_name, str):
        full_name = full_name.strip() or None
    else:
        full_name = None

    education_data = (
        {"degrees": degrees}
        if degrees
        else None
    )

    analysis_record = ResumeAnalysis(
        resume_id=resume_id,
        file_name=filename,
        file_type=pipeline_result.get("file_type"),

        full_name=full_name,

        email=contact_info.get("email"),
        phone=contact_info.get("phone"),

        skills=skills or None,
        organizations=organizations or None,

        education=education_data,

        extraction_quality=pipeline_result.get(
            "extraction_quality"
        ),
    )

    try:
        db.add(analysis_record)
        db.commit()
        db.refresh(analysis_record)

        return analysis_record

    except Exception:
        db.rollback()
        raise


# --------------------------------------------------
# Upload Resume
# --------------------------------------------------

@router.post("/upload-resume")
def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Upload a candidate resume, save it in the database,
    run the AI pipeline, and persist successful analysis results.
    """

    if current_user.role != "candidate":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden. Candidate role required."
        )

    allowed_extensions = [".pdf", ".docx"]

    file_ext = os.path.splitext(
        file.filename or ""
    )[1].lower()

    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only PDF and DOCX files are allowed."
        )

    safe_base = _sanitize_filename(file.filename)

    unique_filename = (
        f"user_{current_user.id}_{uuid4().hex}_{safe_base}"
    )

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_filename
    )

    db_committed = False

    # Step 1: Save uploaded file and database record

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        db_resume = Resume(
            filename=file.filename,
            file_path=file_path,
            user_id=current_user.id
        )

        db.add(db_resume)
        db.flush()

        saved_file_id = db_resume.id
        saved_filename = db_resume.filename
        saved_file_path = db_resume.file_path

        db.commit()
        db_committed = True

    except Exception as exc:
        if not db_committed:
            _remove_file_silently(file_path)
            db.rollback()

        logger.exception(
            "Failed to upload resume for user_id=%s: %s",
            current_user.id,
            exc
        )

        raise HTTPException(
            status_code=500,
            detail="An error occurred while uploading the file."
        )

    # Step 2: Run AI Pipeline

    analysis_completed = False
    analysis_persisted = False
    analysis_error = None
    analysis_data = None

    try:
        pipeline_result = process_resume(
            saved_file_path,
            job_requirements=None
        )

        if (
            isinstance(pipeline_result, dict)
            and pipeline_result.get("success") is True
        ):
            analysis_completed = True

            analysis_data = _sanitize_analysis_for_response(
                pipeline_result
            )

            # Step 3: Save analysis in database

            try:
                _save_analysis_to_database(
                    db=db,
                    resume_id=saved_file_id,
                    filename=saved_filename,
                    pipeline_result=pipeline_result
                )

                analysis_persisted = True

            except Exception as exc:
                analysis_error = (
                    "Analysis completed but could not be saved."
                )

                logger.exception(
                    "Failed to save analysis for resume_id=%s: %s",
                    saved_file_id,
                    exc
                )

        else:
            analysis_error = (
                pipeline_result.get("error")
                if isinstance(pipeline_result, dict)
                and pipeline_result.get("error")
                else "Resume analysis could not be completed."
            )

            logger.warning(
                "AI pipeline returned unsuccessful result "
                "for resume_id=%s, user_id=%s: %s",
                saved_file_id,
                current_user.id,
                analysis_error
            )

    except Exception as exc:
        analysis_error = (
            "An error occurred while analyzing the resume."
        )

        logger.exception(
            "AI pipeline raised exception for resume_id=%s, user_id=%s: %s",
            saved_file_id,
            current_user.id,
            exc
        )

    # Step 4: Return response

    overall_success = (
        analysis_completed and analysis_persisted
    )

    return {
        "status": "success",
        "upload_status": "success",

        "analysis_status": (
            "completed" if overall_success else "failed"
        ),

        "analysis_completed": analysis_completed,
        "analysis_persisted": analysis_persisted,

        "message": (
            "File uploaded, analyzed, and analysis saved successfully"
            if overall_success
            else "File uploaded successfully, but analysis was not fully completed or saved"
        ),

        "file_id": saved_file_id,
        "filename": saved_filename,

        "analysis": analysis_data,

        "analysis_error": (
            None if overall_success
            else analysis_error
        ),
    }


# --------------------------------------------------
# Get Candidate Analyses
# --------------------------------------------------

@router.get("/my-analyses")
def get_my_analyses(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve all resume analyses belonging to the authenticated candidate.
    """

    if current_user.role != "candidate":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden. Candidate role required."
        )

    analyses = (
        db.query(ResumeAnalysis)
        .join(
            Resume,
            ResumeAnalysis.resume_id == Resume.id
        )
        .filter(
            Resume.user_id == current_user.id
        )
        .order_by(
            ResumeAnalysis.id.desc()
        )
        .all()
    )

    return {
        "status": "success",
        "total": len(analyses),

        "analyses": [
            {
                "analysis_id": item.id,
                "resume_id": item.resume_id,

                "file_name": item.file_name,
                "file_type": item.file_type,

                "full_name": item.full_name,
                "email": item.email,
                "phone": item.phone,

                "experience_years": item.experience_years,

                "skills": item.skills or [],
                "organizations": item.organizations or [],

                "education": item.education,
                "projects": item.projects,

                "extraction_quality": item.extraction_quality,
            }

            for item in analyses
        ]
    }
