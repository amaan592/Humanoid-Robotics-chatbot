from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class TextbookContentChunk(BaseModel):
    """
    Model representing a chunk of textbook content stored in the vector database
    """
    id: str
    content: str
    chapter: str
    section: str
    source_path: str
    embedding: Optional[List[float]] = None
    metadata: dict = {}
    created_at: datetime = None
    updated_at: datetime = None


class QueryRequest(BaseModel):
    """
    Request model for querying the textbook content
    """
    query: str
    query_type: str = "full_book"  # "full_book" or "selected_text"
    selected_text: Optional[str] = None


class Source(BaseModel):
    """
    Model representing a source from the textbook content
    """
    chapter: str
    section: str
    content: str
    score: float


class QueryResponse(BaseModel):
    """
    Response model for query results
    """
    response: str
    sources: List[Source]
    confidence: float


class IngestionRequest(BaseModel):
    """
    Request model for ingesting textbook content
    """
    content: str
    chapter: str
    section: str
    source_path: str
    chunk_size: int = 1000
    chunk_overlap: int = 100


class HealthResponse(BaseModel):
    """
    Response model for health check
    """
    status: str
    timestamp: str
    services: dict