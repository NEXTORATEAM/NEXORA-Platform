import os
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.db.models.user import User
from app.db.session import get_db

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

_WEAK_OR_PLACEHOLDER_KEYS = {
    "nexora_super_secret_key_2026",
    "secret",
    "secret_key",
    "changeme",
    "change_me",
    "default",
    "test",
    "testing",
    "dev",
    "development",
    "example",
    "password",
    "123456",
}

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/token"
)


def _get_secret_key() -> str:
    raw_key = os.getenv("SECRET_KEY")
    if not raw_key:
        raise RuntimeError(
            "SECRET_KEY environment variable is not set. Provide a strong secret of at least 32 characters."
        )

    secret = raw_key.strip()
    if len(secret) < 32:
        raise RuntimeError(
            "SECRET_KEY is too weak. It must be at least 32 characters long."
        )

    if secret.lower() in _WEAK_OR_PLACEHOLDER_KEYS or "nexora_super_secret_key" in secret.lower():
        raise RuntimeError(
            "SECRET_KEY cannot be a default, placeholder, or known weak/test value."
        )

    return secret


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    secret_key = _get_secret_key()
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta if expires_delta is not None else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, secret_key, algorithm=ALGORITHM)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        secret_key = _get_secret_key()
        payload = jwt.decode(token, secret_key, algorithms=[ALGORITHM])
        email: Optional[str] = payload.get("sub")
        if not email:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception

    if getattr(user, "is_active", True) is False:
        raise credentials_exception

    return user


def require_role(required_role: str):
    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if getattr(current_user, "role", None) != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )
        return current_user

    return role_checker