from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import os
import asyncio
import logging
from datetime import datetime

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

# Import Cohere and Qdrant clients
import cohere
from qdrant_client import QdrantClient
from qdrant_client.http import models
from qdrant_client.models import PointStruct

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

# Initialize Cohere client
cohere_api_key = os.getenv("COHERE_API_KEY")
if not cohere_api_key:
    raise ValueError("COHERE_API_KEY environment variable is required")
co = cohere.Client(cohere_api_key)

# Initialize Qdrant client
qdrant_url = os.getenv("QDRANT_URL")
qdrant_api_key = os.getenv("QDRANT_API_KEY")
if not qdrant_url or not qdrant_api_key:
    raise ValueError("QDRANT_URL and QDRANT_API_KEY environment variables are required")

# Define collection name
COLLECTION_NAME = "textbook_content"

# Try to connect to cloud Qdrant, fallback to local if that fails
try:
    qdrant_client = QdrantClient(
        url=qdrant_url,
        api_key=qdrant_api_key,
        https=True,
        verify=True
    )
    # Test connection
    qdrant_client.get_collections()
    logger.info("Successfully connected to Qdrant Cloud")
except Exception as e:
    logger.warning(f"Could not connect to Qdrant Cloud: {e}. Using local in-memory storage for testing.")
    qdrant_client = QdrantClient(":memory:")
    logger.info("Using in-memory Qdrant for testing")

    # Create collection and add test data for immediate testing
    try:
        # Create collection
        qdrant_client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=models.VectorParams(
                size=4096,  # Cohere's large model returns 4096-dimensional vectors
                distance=models.Distance.COSINE
            )
        )
        logger.info(f"Created collection: {COLLECTION_NAME}")

        # Add some test content to make the chatbot functional immediately
        test_texts = [
            {
                "content": "Robotics is an interdisciplinary branch of engineering and science that includes mechanical engineering, electrical engineering, computer science, and others. It deals with the design, construction, operation, and use of robots, as well as computer systems for their control, sensory feedback, and information processing.",
                "chapter": "Introduction to Robotics",
                "section": "What is Robotics"
            },
            {
                "content": "Physical AI refers to artificial intelligence systems that interact with the physical world through sensors and actuators. These systems must understand and manipulate physical objects, navigate physical spaces, and respond to physical forces and constraints.",
                "chapter": "Physical AI Concepts",
                "section": "Physical AI"
            },
            {
                "content": "Embodied intelligence is the theory that many features of human and animal intelligence are shaped by the physical body and its interactions with the environment. This approach suggests that intelligence emerges from the interaction between brain, body, and environment.",
                "chapter": "Embodied Intelligence",
                "section": "Embodied Intelligence Theory"
            }
        ]

        # Add test data to collection
        for i, text_obj in enumerate(test_texts):
            response = co.embed(
                texts=[text_obj["content"]],
                model="large"
            )
            embedding = response.embeddings[0]

            # Add to Qdrant
            qdrant_client.upsert(
                collection_name=COLLECTION_NAME,
                points=[
                    PointStruct(
                        id=i,
                        vector=embedding,
                        payload={
                            "content": text_obj["content"],
                            "chapter": text_obj["chapter"],
                            "section": text_obj["section"],
                            "source_path": "test_content"
                        }
                    )
                ]
            )

        logger.info(f"Added {len(test_texts)} test documents to collection for immediate use")
    except Exception as e:
        logger.error(f"Error setting up test data: {e}")

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

        # Generate embedding for the query
        response = co.embed(
            texts=[request.query],
            model="large"
        )
        query_embedding = response.embeddings[0]

        # Retrieve relevant context based on query type
        if request.query_type == "selected_text" and request.selected_text:
            # For selected text queries, use the selected text as context
            retrieved_context = await retrieve_context_from_selected_text(request.selected_text)
        else:
            # For full-book queries, search the vector database
            retrieved_context = await retrieve_context_from_vector_db(query_embedding)

        # Generate response using Cohere
        response_text, confidence = await generate_response(request.query, retrieved_context)

        # Format sources
        sources = []
        for chunk in retrieved_context:
            sources.append(Source(
                chapter=chunk.get("chapter", "Unknown"),
                section=chunk.get("section", "Unknown"),
                content=chunk.get("content", "")[:200] + "..." if len(chunk.get("content", "")) > 200 else chunk.get("content", ""),
                score=chunk.get("score", 0.0)
            ))

        return QueryResponse(
            response=response_text,
            sources=sources,
            confidence=confidence
        )

    except Exception as e:
        logger.error(f"Error processing query: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

async def retrieve_context_from_vector_db(query_embedding: List[float], top_k: int = 5):
    """
    Retrieve relevant context from the vector database
    """
    try:
        # Search in Qdrant collection
        search_results = qdrant_client.search(
            collection_name=COLLECTION_NAME,
            query_vector=query_embedding,
            limit=top_k,
            with_payload=True
        )

        # Format results
        context_chunks = []
        for result in search_results:
            chunk = result.payload
            chunk["score"] = result.score
            context_chunks.append(chunk)

        return context_chunks

    except Exception as e:
        logger.error(f"Error retrieving context from vector DB: {str(e)}")
        raise

async def retrieve_context_from_selected_text(selected_text: str):
    """
    For selected text queries, return the selected text as context
    """
    return [{
        "content": selected_text,
        "chapter": "Selected Text",
        "section": "User Selection",
        "score": 1.0
    }]

async def generate_response(query: str, context_chunks: List[dict]):
    """
    Generate response using Cohere based on the retrieved context
    """
    try:
        # Combine context chunks into a single context string
        context_text = "\n\n".join([chunk["content"] for chunk in context_chunks if chunk["content"]])

        if not context_text.strip():
            return "The answer is not available in the provided material.", 0.0

        # Construct the prompt for Cohere
        prompt = f"""
        Based on the following textbook content, answer the user's question.
        If the answer cannot be found in the provided content, respond with "The answer is not available in the provided material."

        Context:
        {context_text}

        Question: {query}

        Answer:
        """

        # Generate response using Cohere (compatible with v4.x)
        response = co.generate(
            model="command-r-plus",
            prompt=prompt,
            max_tokens=500,
            temperature=0.3,
            stop_sequences=["Question:", "Context:"]
        )

        generated_text = response.generations[0].text.strip()

        # Calculate confidence based on context relevance
        avg_score = sum(chunk.get("score", 0.0) for chunk in context_chunks) / len(context_chunks) if context_chunks else 0.0
        confidence = min(avg_score, 1.0)  # Ensure confidence is between 0 and 1

        return generated_text, confidence

    except Exception as e:
        logger.error(f"Error generating response: {str(e)}")
        raise

@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint
    """
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat(),
        services={
            "cohere": "connected",
            "qdrant": "connected"
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)