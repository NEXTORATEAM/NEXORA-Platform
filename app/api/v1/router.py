from fastapi import APIRouter
from app.api.v1.endpoints import analytics, auth, recruiters, upload

api_router = APIRouter()

@api_router.get("/health-check")
def health_check():
    return {"status": "healthy", "version": "1.0.0"}

api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"]
)

api_router.include_router(
    analytics.router,
    prefix="/analytics",
    tags=["Analytics & Resume Analysis"]
)

api_router.include_router(
    recruiters.router,
    prefix="/recruiter",
    tags=["Recruiter Dashboard"]
)

api_router.include_router(
    upload.router,
    prefix="/candidate",
    tags=["Candidate Upload"]
)