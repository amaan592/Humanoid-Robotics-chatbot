from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import logging
from datetime import datetime

# Import models
from models import QueryRequest, Source, QueryResponse, HealthResponse

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Textbook RAG Chatbot API",
    description="Retrieval-Augmented Generation API for the Physical AI & Humanoid Robotics textbook",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Textbook RAG Chatbot API is running"}

@app.post("/api/query", response_model=QueryResponse)
async def query_endpoint(request: QueryRequest):
    """
    Main query endpoint that handles both full-book and selected-text queries
    """
    try:
        logger.info(f"Processing query: {request.query[:50]}...")

        # For testing purposes, return a mock response
        # In production, this would connect to Cohere and Qdrant
        mock_response = f"This is a mock response for your query: '{request.query}'. In a production environment, this would connect to Cohere and Qdrant to provide real answers based on the textbook content."

        sources = [Source(
            chapter="Mock Chapter",
            section="Mock Section",
            content="This is mock content from the textbook...",
            score=0.8
        )]

        return QueryResponse(
            response=mock_response,
            sources=sources,
            confidence=0.75
        )

    except Exception as e:
        logger.error(f"Error processing query: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint
    """
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat(),
        services={
            "cohere": "not connected (testing mode)",
            "qdrant": "not connected (testing mode)"
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)