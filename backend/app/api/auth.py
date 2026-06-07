from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.schemas.user import UserCreate, UserLogin, UserResponse, Token, UserUpdate
from app.services.supabase_client import supabase
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.config import settings

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    response = supabase.table("users").select("*").eq("id", user_id).execute()
    if not response.data:
        raise credentials_exception
    return response.data[0]


@router.post("/register", response_model=UserResponse)
def register(user: UserCreate):
    # Check if user exists
    existing = supabase.table("users").select("*").eq("email", user.email).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    # create in supabase auth? The ADR says "hash password, insert ke users".
    # Supabase also has built-in auth, but we are managing it manually in the 'users' table based on ADR.
    new_user = {
        "email": user.email,
        "password_hash": hashed_password,
        "name": user.name,
    }
    response = supabase.table("users").insert(new_user).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create user")
    return response.data[0]


@router.post("/login", response_model=Token)
def login(user_login: UserLogin):
    response = (
        supabase.table("users").select("*").eq("email", user_login.email).execute()
    )
    if not response.data:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    user = response.data[0]
    if not verify_password(user_login.password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token = create_access_token(data={"sub": str(user["id"])})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
def get_me(current_user: dict = Depends(get_current_user)):
    return current_user


@router.put("/me", response_model=UserResponse)
def update_me(user_update: UserUpdate, current_user: dict = Depends(get_current_user)):
    update_data = {k: v for k, v in user_update.model_dump().items() if v is not None}
    if not update_data:
        return current_user

    response = (
        supabase.table("users")
        .update(update_data)
        .eq("id", current_user["id"])
        .execute()
    )
    return response.data[0]
