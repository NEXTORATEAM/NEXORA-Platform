from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, analytics, batch, recommendations

api_router = APIRouter()

# مسار فحص صحة النظام
@api_router.get("/health-check", tags=["Health Check"])
def health_check():
    return {"status": "healthy", "version": "1.0.0"}

# مسارات المصادقة
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])

# مسارات المستخدمين والملف الشخصي
api_router.include_router(users.router, prefix="/users", tags=["Users"])

# مسارات التحليل
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics & Resume Analysis"])

# مسارات الرفع الجماعي والمعالجة
api_router.include_router(batch.router, prefix="/batch", tags=["Bulk Processing"])

# مسارات التوصيات وخدمات الذكاء الاصطناعي
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["Recommendations & AI Services"])