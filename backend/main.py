from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, mood, journal, community

app = FastAPI(title="Tenang API")

# Configure CORS
origins = [
    "http://localhost:5173",  # Vite default
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(mood.router, prefix="/mood", tags=["Mood"])
app.include_router(journal.router, prefix="/journal", tags=["Journal"])
app.include_router(community.router, prefix="/community", tags=["Community"])


@app.get("/")
def read_root():
    return {"message": "Welcome to Tenang API"}
