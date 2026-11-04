from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models.user import User
from app.core.security import get_password_hash, get_current_user
from pydantic import BaseModel, EmailStr
from typing import Optional

router = APIRouter(prefix="/users", tags=["Users"])

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

@router.get("/me")
def get_user_profile(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }

@router.put("/me")
def update_user_profile(
    data: UserUpdate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    if data.name:
        current_user.name = data.name
    
    if data.email and data.email != current_user.email:
        existing = db.query(User).filter(User.email == data.email).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered by another user")
        current_user.email = data.email
        
    if data.password:
        current_user.hashed_password = get_password_hash(data.password)
        
    db.commit()
    db.refresh(current_user)
    
    return {"message": "Profile updated successfully", "user": {"name": current_user.name, "email": current_user.email}}