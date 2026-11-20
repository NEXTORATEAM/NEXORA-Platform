import os
import shutil
import tempfile
import zipfile
from typing import List, Optional

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from pydantic import BaseModel

from ai_engine.ingestion_manager import ResumeIngestionManager
from ai_engine.matching.gap_analyzer import GapAnalyzer
from ai_engine.pipeline import process_resume

router = APIRouter(tags=["Resume & Gap Analysis"])

# تهيئة مدير الإدخال والتخزين في ChromaDB
ingestion_manager = ResumeIngestionManager()

# تهيئة نموذج تحليل الفجوات مرة واحدة عند تشغيل السيرفر
gap_analyzer = GapAnalyzer()


class GapAnalysisRequest(BaseModel):
    candidate_skills: List[str]
    job_requirements: List[str]


@router.post("/upload-single")
async def upload_single_resume(
    file: UploadFile = File(...),
    candidate_name: str = Form("Candidate"),
    job_requirements: Optional[str] = Form(None),
):
    """
    نقطة نهاية لرفع ومعالجة سيرة ذاتية مفردة ومعالجة المهارات وتحليل الفجوات ديناميكياً.
    """
    temp_dir = tempfile.mkdtemp()
    file_path = os.path.join(temp_dir, file.filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 1. تجهيز وتحويل متطلبات الوظيفة إلى قائمة (List)
        req_list = (
            [req.strip() for req in job_requirements.replace("،", ",").split(",") if req.strip()]
            if job_requirements
            else []
        )

        # 2. استخراج البيانات والمهارات عبر الـ pipeline مع تمرير المتطلبات للبحث الديناميكي
        parsed_result = process_resume(file_path, job_requirements=req_list)

        if not parsed_result.get("success"):
            raise HTTPException(status_code=400, detail=parsed_result.get("error"))

        # سحب البيانات بالطريقة الصحيحة من القاموس الداخلي
        extracted_data = parsed_result.get("extracted_data", {})
        extracted_skills = extracted_data.get("skills", [])
        contact_info = parsed_result.get("contact_info", {})

        # 3. تخزين السيرة في ChromaDB
        resume_id = f"res_{os.path.splitext(file.filename)[0]}"
        success = ingestion_manager.ingest_single_resume(file_path, resume_id, candidate_name)

        if not success:
            raise HTTPException(status_code=400, detail="Failed to process and store the resume.")

        # 4. تحليل الفجوات ومعادلة الـ ATS Score
        gap_results = {}
        if req_list:
            gap_results = gap_analyzer.analyze_gap(
                candidate_skills=extracted_skills,
                job_requirements=req_list,
            )

        return {
            "success": True,
            "message": f"Successfully processed resume for {candidate_name} and performed gap analysis.",
            "candidate_name": candidate_name,
            "contact_info": contact_info,
            "extracted_skills": extracted_skills,
            "gap_analysis": gap_results if req_list else "No job requirements provided.",
        }

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


@router.post("/upload-batch-zip")
async def upload_batch_zip(
    file: UploadFile = File(...),
    job_requirements: Optional[str] = Form(None),
):
    """
    معالجة ملف ZIP جماعياً وتحليل الفجوات وترتيب المرشحين تنازلياً.
    """
    if not file.filename or not file.filename.lower().endswith(".zip"):
        raise HTTPException(status_code=400, detail="Only ZIP files are allowed.")

    temp_dir = tempfile.mkdtemp()
    zip_path = os.path.join(temp_dir, file.filename)

    try:
        with open(zip_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # تحويل المتطلبات إلى قائمة
        req_list = []
        if job_requirements:
            req_list = [req.strip() for req in job_requirements.replace("،", ",").split(",") if req.strip()]

        extracted_results = []
        success_count = 0
        failed_count = 0

        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            zip_ref.extractall(temp_dir)

        for root, _, files in os.walk(temp_dir):
            for file_name in files:
                if file_name.startswith("."):
                    continue

                file_path = os.path.join(root, file_name)
                if file_name.lower().endswith((".pdf", ".docx")):
                    try:
                        res = process_resume(file_path, job_requirements=req_list)
                        if res.get("success"):
                            success_count += 1
                        else:
                            failed_count += 1

                        extracted_results.append({
                            "file_name": file_name,
                            "processing_status": res,
                        })
                    except Exception as inner_e:
                        failed_count += 1
                        extracted_results.append({
                            "file_name": file_name,
                            "processing_status": {"success": False, "error": str(inner_e)},
                        })
                else:
                    failed_count += 1
                    extracted_results.append({
                        "file_name": file_name,
                        "processing_status": {"success": False, "error": "Unsupported file format"},
                    })

        # تحليل وترتيب المرشحين
        analyzed_candidates = []
        for candidate in extracted_results:
            file_name = candidate.get("file_name", "Unknown")
            res_status = candidate.get("processing_status", {})
            extracted_data = res_status.get("extracted_data", {})
            candidate_skills = extracted_data.get("skills", [])

            gap_result = {}
            if req_list:
                gap_result = gap_analyzer.analyze_gap(
                    candidate_skills=candidate_skills,
                    job_requirements=req_list,
                )

            analyzed_candidates.append({
                "file_name": file_name,
                "extracted_skills": candidate_skills,
                "gap_analysis": gap_result,
            })

        if req_list:
            analyzed_candidates.sort(
                key=lambda x: x["gap_analysis"].get("match_percentage", 0),
                reverse=True,
            )

        return {
            "success": True,
            "message": "Batch processing and gap analysis completed successfully.",
            "total_processed": success_count + failed_count,
            "successful_resumes": success_count,
            "failed_resumes": failed_count,
            "ranked_candidates": analyzed_candidates,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


@router.post("/analyze-gap")
async def analyze_candidate_gap(data: GapAnalysisRequest):
    """
    Endpoint to analyze skill gaps and semantically compare candidate skills with job requirements manually.
    """
    try:
        result = gap_analyzer.analyze_gap(data.candidate_skills, data.job_requirements)
        return {
            "success": True,
            "message": "Gap analysis completed successfully.",
            "data": result,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))