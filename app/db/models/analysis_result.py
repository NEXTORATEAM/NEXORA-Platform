from sqlalchemy import Column, Integer, Float, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id", ondelete="CASCADE"), nullable=False)
    job_id = Column(Integer, ForeignKey("job_posts.id", ondelete="CASCADE"), nullable=True)
    match_score = Column(Float, nullable=False)  # نسبة المطابقة %
    extracted_skills = Column(JSON, nullable=True)  # المهارات المستخرجة كـ JSON
    missing_skills = Column(JSON, nullable=True)    # الفجوات المهارية
    feedback = Column(Text, nullable=True)          # التوصيات والنصائح
    analyzed_at = Column(DateTime(timezone=True), server_default=func.now())

    resume = relationship("Resume", backref="analysis_results")
    job = relationship("JobPost", backref="analysis_results")