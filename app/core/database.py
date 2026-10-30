from sqlalchemy import create_engine
import os

# رابط الاتصال بقاعدة البيانات محلياً على بورت 5435
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:@localhost:5435/nexora_db")

engine = create_engine(DATABASE_URL)