from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID

class JournalCreate(BaseModel):
    content: str = Field(..., min_length=2, description="Isi jurnal pengguna")

class JournalResponse(BaseModel):
    id: UUID
    user_id: UUID
    content: str
    ai_insight: Optional[str] = None
    sentiment_score: Optional[float] = None
    sentiment_label: Optional[str] = None
    word_count: int
    created_at: datetime
    
    # Tambahan untuk frontend rendering (tidak disimpan ke db)
    highlight: Optional[str] = None
    suggested_action: Optional[str] = None
    crisis_message: Optional[str] = None

    class Config:
        from_attributes = True
