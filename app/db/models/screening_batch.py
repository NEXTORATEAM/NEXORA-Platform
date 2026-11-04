import enum
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum as SQLAlchemyEnum
from sqlalchemy.sql import func
from app.db.base import Base

class BatchStatusEnum(str, enum.Enum):
    PROCESSING = "processing"
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"

class ScreeningBatch(Base):
    __tablename__ = "screening_batches"

    id = Column(Integer, primary_key=True, index=True)
    recruiter_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(SQLAlchemyEnum(BatchStatusEnum, name="batchstatus"), default=BatchStatusEnum.PROCESSING, nullable=False)
    total_files = Column(Integer, default=0, nullable=False)
    zip_filename = Column(String, nullable=False)  # الحقل الإلزامي المعرّف بدقة
    created_at = Column(DateTime(timezone=True), server_default=func.now())