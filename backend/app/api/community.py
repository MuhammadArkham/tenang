from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime

from app.schemas.community import PostCreate, PostResponse, CommentCreate, CommentResponse
from app.api.auth import get_current_user
from app.services.supabase_client import supabase

router = APIRouter()

# Helper untuk mendapatkan nama user
def get_user_name(user_id: str) -> str:
    res = supabase.table("users").select("name").eq("id", user_id).execute()
    if res.data:
        return res.data[0]["name"]
    return "User"

@router.post("/posts", response_model=PostResponse)
def create_post(post: PostCreate, current_user: dict = Depends(get_current_user)):
    new_post = {
        "user_id": current_user["id"],
        "title": post.title,
        "content": post.content,
        "is_anonymous": post.is_anonymous
    }
    
    res = supabase.table("community_posts").insert(new_post).execute()
    if not res.data:
        raise HTTPException(status_code=500, detail="Gagal membuat postingan")
        
    db_post = dict(res.data[0])
    
    # Set nama penulis jika tidak anonim
    if db_post["is_anonymous"]:
        db_post["author_name"] = "Anonim"
    else:
        db_post["author_name"] = current_user.get("name", "User")
        
    db_post["comment_count"] = 0
    return db_post

@router.get("/posts", response_model=List[PostResponse])
def get_posts(limit: int = 50, current_user: dict = Depends(get_current_user)):
    # Mengambil post
    res = supabase.table("community_posts").select("*").order("created_at", desc=True).limit(limit).execute()
    
    posts = []
    for row in res.data:
        post = dict(row)
        
        # Anonimisasi
        if post["is_anonymous"]:
            post["author_name"] = "Anonim"
        else:
            post["author_name"] = get_user_name(post["user_id"])
            
        # Hitung jumlah komentar (bisa pakai count aggregation jika database support, kita hitung manual atau query terpisah untuk sederhananya)
        comment_res = supabase.table("community_comments").select("id").eq("post_id", post["id"]).execute()
        post["comment_count"] = len(comment_res.data) if comment_res.data else 0
        
        posts.append(post)
        
    return posts

@router.get("/posts/{post_id}", response_model=PostResponse)
def get_post_detail(post_id: str, current_user: dict = Depends(get_current_user)):
    res = supabase.table("community_posts").select("*").eq("id", post_id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Postingan tidak ditemukan")
        
    post = dict(res.data[0])
    
    if post["is_anonymous"]:
        post["author_name"] = "Anonim"
    else:
        post["author_name"] = get_user_name(post["user_id"])
        
    comment_res = supabase.table("community_comments").select("id").eq("post_id", post["id"]).execute()
    post["comment_count"] = len(comment_res.data) if comment_res.data else 0
    
    return post

@router.post("/posts/{post_id}/comments", response_model=CommentResponse)
def create_comment(post_id: str, comment: CommentCreate, current_user: dict = Depends(get_current_user)):
    # Pastikan post ada
    post_check = supabase.table("community_posts").select("id").eq("id", post_id).execute()
    if not post_check.data:
        raise HTTPException(status_code=404, detail="Postingan tidak ditemukan")
        
    new_comment = {
        "post_id": post_id,
        "user_id": current_user["id"],
        "content": comment.content,
        "is_anonymous": comment.is_anonymous
    }
    
    res = supabase.table("community_comments").insert(new_comment).execute()
    if not res.data:
        raise HTTPException(status_code=500, detail="Gagal menambahkan komentar")
        
    db_comment = dict(res.data[0])
    
    if db_comment["is_anonymous"]:
        db_comment["author_name"] = "Anonim"
    else:
        db_comment["author_name"] = current_user.get("name", "User")
        
    return db_comment

@router.get("/posts/{post_id}/comments", response_model=List[CommentResponse])
def get_comments(post_id: str, current_user: dict = Depends(get_current_user)):
    res = supabase.table("community_comments").select("*").eq("post_id", post_id).order("created_at", desc=False).execute()
    
    comments = []
    for row in res.data:
        c = dict(row)
        if c["is_anonymous"]:
            c["author_name"] = "Anonim"
        else:
            c["author_name"] = get_user_name(c["user_id"])
        comments.append(c)
        
    return comments
