from sqlalchemy import Column, Integer, String, Boolean
from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=True)  # حقل الاسم للحفاظ على بيانات المستخدم
    is_active = Column(Boolean, default=True)
    role = Column(String, default="candidate")  # نوع المستخدم: candidate أو recruiter