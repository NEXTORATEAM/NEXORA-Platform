from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.db.base import Base

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, nullable=True)
    batch_id = Column(Integer, ForeignKey("screening_batches.id"), nullable=True)
    ats_score = Column(Float, default=0.0)
    matched_skills = Column(Text, nullable=True)
    missing_skills = Column(Text, nullable=True)
    summary = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())