from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.dialects.postgresql import ARRAY
from app.db.base import Base

class ResumeAnalysis(Base):
    __tablename__ = "resume_analyses"

    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String, index=True)
    full_name = Column(String, nullable=True)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    experience_years = Column(Integer, default=0)
    skills = Column(ARRAY(String), nullable=True)
    education = Column(JSON, nullable=True)
    projects = Column(JSON, nullable=True)
    extraction_quality = Column(String, nullable=True)