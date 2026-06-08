from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID

class MoodBase(BaseModel):
    mood_score: int = Field(..., ge=1, le=5, description="Skor mood 1-5")
    energy_level: int = Field(..., ge=1, le=5, description="Level energi 1-5")
    context: Optional[str] = Field(None, description="Konteks aktivitas")
    note: Optional[str] = Field(None, description="Catatan opsional")

class MoodCreate(MoodBase):
    pass

class MoodResponse(MoodBase):
    id: UUID
    user_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class MoodWeekly(BaseModel):
    day: str
    avg_mood: float
    entry_count: int
