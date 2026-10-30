from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func
import enum
from app.db.base import Base

class BatchStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class ScreeningBatch(Base):
    __tablename__ = "screening_batches"

    id = Column(Integer, primary_key=True, index=True)
    recruiter_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    zip_filename = Column(String(255), nullable=False)
    total_files = Column(Integer, default=0)
    status = Column(Enum(BatchStatus), default=BatchStatus.PENDING)
    created_at = Column(DateTime(timezone=True), server_default=func.now())