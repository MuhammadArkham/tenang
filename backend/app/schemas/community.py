from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class CommentBase(BaseModel):
    content: str
    is_anonymous: bool = False

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    id: str
    post_id: str
    user_id: str
    created_at: datetime
    # Jika anonim, author_name akan diisi string generik seperti "Seseorang"
    author_name: Optional[str] = None

class PostBase(BaseModel):
    title: str
    content: str
    is_anonymous: bool = False

class PostCreate(PostBase):
    pass

class PostResponse(PostBase):
    id: str
    user_id: str
    created_at: datetime
    author_name: Optional[str] = None
    comments: List[CommentResponse] = []
