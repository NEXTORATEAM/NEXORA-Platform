from fastapi import APIRouter

api_router = APIRouter()

@api_router.get("/health-check")
def health_check():
    return {"status": "healthy", "version": "1.0.0"}