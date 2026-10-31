from pydantic import BaseModel
from typing import List, Optional, Any

class EducationSchema(BaseModel):
    degree: Optional[str] = None
    institution: Optional[str] = None
    graduation_year: Optional[str] = None

class ProjectSchema(BaseModel):
    project_name: Optional[str] = None
    tools_used: Optional[List[str]] = []

class ExtractedDataSchema(BaseModel):
    personal_info: Optional[dict] = None
    education: Optional[List[EducationSchema]] = []
    experience_years: Optional[int] = 0
    skills: Optional[List[str]] = []
    projects: Optional[List[ProjectSchema]] = []

class AIAnalysisInput(BaseModel):
    success: bool
    file_name: str
    extracted_data: ExtractedDataSchema
    extraction_quality: Optional[str] = "High"