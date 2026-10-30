from fastapi import APIRouter
from sqlalchemy import text
from app.core.database import engine

router = APIRouter(tags=["Health Check"])

@router.get("/health")
def health_check():
    """فحص حالة السيرفر"""
    return {"status": "healthy", "service": "NEXORA Backend"}

@router.get("/health/db")
def db_health_check():
    """فحص الاتصال بقاعدة البيانات PostgreSQL"""
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "PostgreSQL Connected"}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}