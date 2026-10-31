from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.base import Base
from app.core.database import engine
from app.api.v1.router import api_router
from app.api.v1.endpoints import health, upload
from app.db.session import engine

# إنشاء الجداول في PostgreSQL تلقائياً
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# إعدادات الـ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# الجذر الأساسي للسيرفر
@app.get("/")
def root():
    return {"message": "Welcome to NEXORA Backend System"}

# تضمين المسارات الرئيسية عبر الـ api_router والمسارات المباشرة لـ Sprint 1
app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(health.router, prefix="/api/v1")
app.include_router(upload.router, prefix="/api/v1")



