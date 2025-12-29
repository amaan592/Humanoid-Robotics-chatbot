@echo off
echo Starting Textbook RAG Chatbot API...

REM Check if uvicorn is installed
pip show uvicorn >nul 2>&1
if errorlevel 1 (
    echo uvicorn not found, installing...
    pip install "uvicorn[standard]"
)

REM Run the server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload