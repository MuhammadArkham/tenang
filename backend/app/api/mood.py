from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime, date, timedelta
import pytz

from app.schemas.mood import MoodCreate, MoodResponse, MoodWeekly
from app.api.auth import get_current_user
from app.services.supabase_client import supabase

router = APIRouter()
JAKARTA_TZ = pytz.timezone('Asia/Jakarta')

@router.post("/", response_model=MoodResponse)
def create_mood_entry(mood: MoodCreate, current_user: dict = Depends(get_current_user)):
    # Validasi 1x per hari (menggunakan timezone Jakarta agar sesuai)
    today = datetime.now(JAKARTA_TZ).date().isoformat()
    
    # Cek entri mood user hari ini
    response = supabase.table("mood_entries")\
        .select("created_at")\
        .eq("user_id", current_user["id"])\
        .gte("created_at", f"{today}T00:00:00+07:00")\
        .lte("created_at", f"{today}T23:59:59+07:00")\
        .execute()
        
    if len(response.data) > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Anda sudah melakukan check-in mood hari ini."
        )

    # Insert data baru
    new_entry = {
        "user_id": current_user["id"],
        "mood_score": mood.mood_score,
        "energy_level": mood.energy_level,
        "context": mood.context,
        "note": mood.note
    }
    
    insert_resp = supabase.table("mood_entries").insert(new_entry).execute()
    
    if not insert_resp.data:
        raise HTTPException(status_code=500, detail="Gagal menyimpan data mood.")
        
    return insert_resp.data[0]

@router.get("/", response_model=List[MoodResponse])
def get_mood_entries(limit: int = 30, current_user: dict = Depends(get_current_user)):
    response = supabase.table("mood_entries")\
        .select("*")\
        .eq("user_id", current_user["id"])\
        .order("created_at", desc=True)\
        .limit(limit)\
        .execute()
        
    return response.data

@router.get("/weekly", response_model=List[MoodWeekly])
def get_weekly_mood(current_user: dict = Depends(get_current_user)):
    # Panggil RPC 'get_weekly_mood' jika sudah dibuat di database
    # atau ambil raw data 7 hari terakhir lalu agregasi manual di Python
    
    # Pendekatan Agregasi Manual (fallback yang aman jika user belum buat custom SQL Function)
    today = datetime.now(JAKARTA_TZ)
    seven_days_ago = (today - timedelta(days=7)).date().isoformat()
    
    response = supabase.table("mood_entries")\
        .select("mood_score, created_at")\
        .eq("user_id", current_user["id"])\
        .gte("created_at", f"{seven_days_ago}T00:00:00+07:00")\
        .order("created_at", desc=True)\
        .execute()
        
    # Proses agregasi per hari
    daily_data = {}
    for entry in response.data:
        # Konversi ISO ke date object timezone Jakarta
        dt = datetime.fromisoformat(entry["created_at"].replace('Z', '+00:00'))
        dt_jkt = dt.astimezone(JAKARTA_TZ)
        day_str = dt_jkt.date().isoformat()
        
        if day_str not in daily_data:
            daily_data[day_str] = {"sum": 0, "count": 0}
            
        daily_data[day_str]["sum"] += entry["mood_score"]
        daily_data[day_str]["count"] += 1
        
    result = []
    for day_str, data in daily_data.items():
        result.append({
            "day": day_str,
            "avg_mood": round(data["sum"] / data["count"], 2),
            "entry_count": data["count"]
        })
        
    # Sort ascending berdasarkan tanggal
    result.sort(key=lambda x: x["day"])
    return result

@router.delete("/{mood_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_mood_entry(mood_id: str, current_user: dict = Depends(get_current_user)):
    # Hapus berdasarkan mood_id dan pastikan milik user yang request (tambahan keamanan selain RLS)
    response = supabase.table("mood_entries")\
        .delete()\
        .match({"id": mood_id, "user_id": current_user["id"]})\
        .execute()
        
    # Jika tidak ada yang dihapus, mungkin id salah atau bukan milik user
    if not response.data:
        raise HTTPException(status_code=404, detail="Entri mood tidak ditemukan.")
    
    return
