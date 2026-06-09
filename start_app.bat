@echo off
echo Starting Tenang Backend...
start cmd /k "cd backend && .\venv\Scripts\python -m uvicorn main:app --reload --port 8001"

echo Starting Tenang Frontend...
start cmd /k "cd frontend && npm run dev"

echo Both servers have been started in new windows!
pause
