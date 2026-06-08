import google.generativeai as genai
import json
from app.core.config import settings

# Inisialisasi API Key
# Hanya configure jika API Key bukan default placeholder
if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_gemini_api_key_here":
    genai.configure(api_key=settings.GEMINI_API_KEY)

# Prompt Template dari Dokumen
JOURNAL_INSIGHT_PROMPT = """
Kamu adalah teman yang empatik, bukan psikolog atau dokter.
Bantu mahasiswa Indonesia merefleksikan perasaan lewat jurnal.
 
JURNAL: {journal_content}
Mood score: {mood_score}/5 | Energi: {energy_level}/5 | Konteks: {context}
 
Balas HANYA dalam format JSON:
{{
  "sentiment_label": "positive"|"neutral"|"negative",
  "sentiment_score": float -1.0 sampai 1.0,
  "insight": "2-3 kalimat hangat. Akui perasaan, jangan langsung solusi.",
  "highlight": "Satu kalimat tema utama jurnal ini. Maks 20 kata.",
  "suggested_action": "Satu saran konkret untuk hari ini. Maks 30 kata."
}}
 
ATURAN: Jangan sebut AI. Jangan diagnosis. Jangan kata klinis.
Kalau ada sinyal krisis, tambah "need_support": true
"""

CRISIS_SUPPORT_MESSAGE = "Hei, kelihatannya kamu lagi melalui waktu yang sangat berat. Kamu tidak harus menanggung ini sendirian. Hubungi Sejiwa: 119 ext 8 (24 jam) | Into The Light: intothelightid.org"

async def analyze_journal(content: str, mood_score: int, energy_level: int, context: str) -> dict:
    if not settings.GEMINI_API_KEY or settings.GEMINI_API_KEY == "your_gemini_api_key_here":
        # Fallback jika API key belum di set
        return None

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        
        prompt = JOURNAL_INSIGHT_PROMPT.format(
            journal_content=content,
            mood_score=mood_score or "-",
            energy_level=energy_level or "-",
            context=context or "-"
        )
        
        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.7,
                "max_output_tokens": 500,
                "response_mime_type": "application/json"
            }
        )
        
        result = json.loads(response.text)
        
        if result.get("need_support"):
            result["crisis_message"] = CRISIS_SUPPORT_MESSAGE
            
        return result
        
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return None
