from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from app.core.config import settings

# استخدام رابط الإعدادات الذي يحتوي على psycopg2 المعتمد
engine = create_engine(settings.DATABASE_URL)

# تعريف الـ Base الخاص بـ SQLAlchemy لتربط النماذج بقاعدة البيانات
Base = declarative_base()