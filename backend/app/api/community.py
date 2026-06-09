from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..schemas.community import PostCreate, PostResponse, CommentCreate, CommentResponse
from ..services.supabase_client import supabase
from .auth import get_current_user

router = APIRouter()

@router.post("/posts", response_model=PostResponse)
def create_post(post: PostCreate, current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user['sub']
        
        data = {
            "user_id": user_id,
            "title": post.title,
            "content": post.content,
            "is_anonymous": post.is_anonymous
        }
        
        response = supabase.table("community_posts").insert(data).execute()
        if not response.data:
            raise HTTPException(status_code=400, detail="Gagal membuat postingan")
            
        post_data = response.data[0]
        # Jika anonim, author name null, jika tidak ambil dari user
        author_name = "Seseorang" if post.is_anonymous else current_user.get('name', 'User')
        
        return {**post_data, "author_name": author_name, "comments": []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/posts", response_model=List[PostResponse])
def get_posts(current_user: dict = Depends(get_current_user)):
    try:
        # Fetch posts
        response = supabase.table("community_posts").select("*, users(name)").order("created_at", desc=True).execute()
        posts = response.data
        
        result = []
        for p in posts:
            author_name = "Seseorang" if p.get('is_anonymous') else (p.get('users', {}).get('name') if p.get('users') else 'User')
            p_data = {
                **p,
                "author_name": author_name,
                "comments": []
            }
            # Remove the raw users join data to match schema
            if 'users' in p_data:
                del p_data['users']
            result.append(p_data)
            
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/posts/{post_id}", response_model=PostResponse)
def get_post_detail(post_id: str, current_user: dict = Depends(get_current_user)):
    try:
        # Fetch post
        post_res = supabase.table("community_posts").select("*, users(name)").eq("id", post_id).execute()
        if not post_res.data:
            raise HTTPException(status_code=404, detail="Postingan tidak ditemukan")
            
        post = post_res.data[0]
        post_author = "Seseorang" if post.get('is_anonymous') else (post.get('users', {}).get('name') if post.get('users') else 'User')
        
        # Fetch comments
        comments_res = supabase.table("community_comments").select("*, users(name)").eq("post_id", post_id).order("created_at", desc=True).execute()
        
        comments_list = []
        for c in comments_res.data:
            c_author = "Seseorang" if c.get('is_anonymous') else (c.get('users', {}).get('name') if c.get('users') else 'User')
            c_data = {**c, "author_name": c_author}
            if 'users' in c_data:
                del c_data['users']
            comments_list.append(c_data)
            
        post_data = {**post, "author_name": post_author, "comments": comments_list}
        if 'users' in post_data:
            del post_data['users']
            
        return post_data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/posts/{post_id}/comments", response_model=CommentResponse)
def create_comment(post_id: str, comment: CommentCreate, current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user['sub']
        
        data = {
            "post_id": post_id,
            "user_id": user_id,
            "content": comment.content,
            "is_anonymous": comment.is_anonymous
        }
        
        response = supabase.table("community_comments").insert(data).execute()
        if not response.data:
            raise HTTPException(status_code=400, detail="Gagal menambahkan komentar")
            
        c_data = response.data[0]
        author_name = "Seseorang" if comment.is_anonymous else current_user.get('name', 'User')
        
        return {**c_data, "author_name": author_name}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
