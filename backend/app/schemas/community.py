from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class PostCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    content: str = Field(..., min_length=10)
    is_anonymous: bool = Field(default=False)

class PostResponse(BaseModel):
    id: UUID
    user_id: UUID
    title: str
    content: str
    is_anonymous: bool
    created_at: datetime
    
    # Ditambahkan manual saat fetching
    author_name: Optional[str] = None
    comment_count: Optional[int] = 0

    class Config:
        from_attributes = True

class CommentCreate(BaseModel):
    content: str = Field(..., min_length=2)
    is_anonymous: bool = Field(default=False)

class CommentResponse(BaseModel):
    id: UUID
    post_id: UUID
    user_id: UUID
    content: str
    is_anonymous: bool
    created_at: datetime
    
    # Ditambahkan manual
    author_name: Optional[str] = None

    class Config:
        from_attributes = True
