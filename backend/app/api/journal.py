from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime
import pytz

from app.schemas.journal import JournalCreate, JournalResponse
from app.api.auth import get_current_user
from app.services.supabase_client import supabase
from app.services.gemini_service import analyze_journal

router = APIRouter()
JAKARTA_TZ = pytz.timezone('Asia/Jakarta')

@router.post("/", response_model=JournalResponse)
async def create_journal_entry(journal: JournalCreate, current_user: dict = Depends(get_current_user)):
    # 1. Cari data mood user hari ini
    today = datetime.now(JAKARTA_TZ).date().isoformat()
    mood_resp = supabase.table("mood_entries")\
        .select("*")\
        .eq("user_id", current_user["id"])\
        .gte("created_at", f"{today}T00:00:00+07:00")\
        .lte("created_at", f"{today}T23:59:59+07:00")\
        .execute()
        
    mood_data = mood_resp.data[0] if mood_resp.data else {}
    
    # 2. Panggil Gemini
    ai_result = await analyze_journal(
        content=journal.content,
        mood_score=mood_data.get("mood_score"),
        energy_level=mood_data.get("energy_level"),
        context=mood_data.get("context")
    )
    
    # 3. Hitung kata
    word_count = len(journal.content.split())
    
    # 4. Siapkan data insert
    new_entry = {
        "user_id": current_user["id"],
        "content": journal.content,
        "word_count": word_count
    }
    
    # Jika Gemini berhasil
    if ai_result:
        # ai_insight digunakan untuk menyimpan insight + highlight + action + crisis di DB secara tekstual (JSON fallback atau plain text)
        # Sesuai schema: ai_insight (text), sentiment_score (float), sentiment_label (varchar)
        import json
        new_entry["sentiment_score"] = ai_result.get("sentiment_score")
        new_entry["sentiment_label"] = ai_result.get("sentiment_label")
        # Simpan seluruh JSON ke dalam ai_insight untuk kemudahan (atau hanya insight text)
        new_entry["ai_insight"] = json.dumps(ai_result)
        
    insert_resp = supabase.table("journal_entries").insert(new_entry).execute()
    
    if not insert_resp.data:
        raise HTTPException(status_code=500, detail="Gagal menyimpan jurnal.")
        
    db_record = insert_resp.data[0]
    
    # Parsing kembali untuk respons ke client
    response_data = dict(db_record)
    if response_data.get("ai_insight"):
        import json
        try:
            parsed_insight = json.loads(response_data["ai_insight"])
            response_data["ai_insight"] = parsed_insight.get("insight")
            response_data["highlight"] = parsed_insight.get("highlight")
            response_data["suggested_action"] = parsed_insight.get("suggested_action")
            response_data["crisis_message"] = parsed_insight.get("crisis_message")
        except:
            pass

    return response_data

@router.get("/", response_model=List[JournalResponse])
def get_journal_entries(limit: int = 20, current_user: dict = Depends(get_current_user)):
    response = supabase.table("journal_entries")\
        .select("*")\
        .eq("user_id", current_user["id"])\
        .order("created_at", desc=True)\
        .limit(limit)\
        .execute()
        
    # Parse json if it's there
    results = []
    for row in response.data:
        row_dict = dict(row)
        if row_dict.get("ai_insight"):
            import json
            try:
                parsed = json.loads(row_dict["ai_insight"])
                row_dict["ai_insight"] = parsed.get("insight")
                row_dict["highlight"] = parsed.get("highlight")
                row_dict["suggested_action"] = parsed.get("suggested_action")
                row_dict["crisis_message"] = parsed.get("crisis_message")
            except:
                pass
        results.append(row_dict)
        
    return results

@router.get("/{journal_id}", response_model=JournalResponse)
def get_journal_entry(journal_id: str, current_user: dict = Depends(get_current_user)):
    response = supabase.table("journal_entries")\
        .select("*")\
        .match({"id": journal_id, "user_id": current_user["id"]})\
        .execute()
        
    if not response.data:
        raise HTTPException(status_code=404, detail="Jurnal tidak ditemukan.")
        
    row_dict = dict(response.data[0])
    if row_dict.get("ai_insight"):
        import json
        try:
            parsed = json.loads(row_dict["ai_insight"])
            row_dict["ai_insight"] = parsed.get("insight")
            row_dict["highlight"] = parsed.get("highlight")
            row_dict["suggested_action"] = parsed.get("suggested_action")
            row_dict["crisis_message"] = parsed.get("crisis_message")
        except:
            pass
            
    return row_dict

@router.delete("/{journal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_journal_entry(journal_id: str, current_user: dict = Depends(get_current_user)):
    response = supabase.table("journal_entries")\
        .delete()\
        .match({"id": journal_id, "user_id": current_user["id"]})\
        .execute()
        
    if not response.data:
        raise HTTPException(status_code=404, detail="Jurnal tidak ditemukan.")
    
    return
