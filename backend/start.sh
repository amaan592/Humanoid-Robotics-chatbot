#!/bin/bash

# Start the FastAPI server
echo "Starting Textbook RAG Chatbot API..."

# Check if uvicorn is installed
if ! command -v uvicorn &> /dev/null
then
    echo "uvicorn could not be found, installing..."
    pip install "uvicorn[standard]"
fi

# Run the server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload