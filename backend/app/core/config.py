import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Tenang API"
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "your_supabase_url_here")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "your_supabase_anon_key_here")
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-prod")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    class Config:
        env_file = ".env"


settings = Settings()
