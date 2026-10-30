from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# إنشاء محرك قاعدة البيانات باستخدام الإعدادات
engine = create_engine(settings.DATABASE_URL)

# إنشاء الـ SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# تعريف الـ Base الأساسي لنماذج SQLAlchemy
Base = declarative_base()

# دالة للحصول على جلسة قاعدة البيانات (Dependency)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()