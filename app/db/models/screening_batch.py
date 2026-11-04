from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class ScreeningBatch(Base):
    __tablename__ = "screening_batches"

    id = Column(Integer, primary_key=True, index=True)
    recruiter_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    batch_name = Column(String(150), nullable=False)
    candidate_ids = Column(JSON, nullable=True)  # قائمة بمعرفات المتقدمين المفرزين
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    recruiter = relationship("User", backref="screening_batches")