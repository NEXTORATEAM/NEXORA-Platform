from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY
from app.db.base import Base


class ResumeAnalysis(Base):
    __tablename__ = "resume_analyses"

    id = Column(Integer, primary_key=True, index=True)

    # Link to the uploaded resume
    resume_id = Column(Integer, ForeignKey("resumes.id"), nullable=True, index=True)

    # File information
    file_name = Column(String, index=True)
    file_type = Column(String, nullable=True)

    # Personal information extracted from resume
    full_name = Column(String, nullable=True)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)

    # Extracted professional information
    experience_years = Column(Integer, default=0)
    skills = Column(ARRAY(String), nullable=True)
    organizations = Column(ARRAY(String), nullable=True)
    education = Column(JSON, nullable=True)
    projects = Column(JSON, nullable=True)

    # Analysis quality
    extraction_quality = Column(String, nullable=True)