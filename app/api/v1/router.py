from fastapi import APIRouter
from app.api.v1.endpoints import analytics, auth, recruiters

api_router = APIRouter()

# مسار فحص الصحة والنظام
@api_router.get("/health-check")
def health_check():
    return {"status": "healthy", "version": "1.0.0"}

# مسارات المصادقة وتسجيل الدخول
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])

# مسارات التحليل وحفظ بيانات السيرة الذاتية
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics & Resume Analysis"])

# مسارات التوظيف ولوحة الشركات
api_router.include_router(recruiters.router, prefix="/recruiter", tags=["Recruiter Dashboard"])
