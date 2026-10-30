import os

class Settings:
    PROJECT_NAME: str = "NEXORA Backend API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # إعدادات قاعدة البيانات المحلية مع تحديد درايفر psycopg2 صراحة
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql+psycopg2://postgres:@localhost:5435/nexora_db"
    )

settings = Settings()