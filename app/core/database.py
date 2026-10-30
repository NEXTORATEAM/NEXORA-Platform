from sqlalchemy import create_engine
from app.core.config import settings

# استخدام رابط الإعدادات الذي يحتوي على psycopg2 المعتمد
engine = create_engine(settings.DATABASE_URL)