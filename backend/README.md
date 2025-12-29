# Textbook RAG Chatbot Backend

This is the backend API for the Retrieval-Augmented Generation (RAG) chatbot that powers the Physical AI & Humanoid Robotics textbook assistant.

## Architecture

The backend follows a RAG (Retrieval-Augmented Generation) architecture:
1. **Query Processing**: User questions are processed and converted to embeddings using Cohere.
2. **Semantic Search**: Embeddings are searched against the textbook content in Qdrant vector database.
3. **Context Retrieval**: Most relevant content chunks are retrieved from the vector database.
4. **Response Generation**: Cohere generates answers based on the retrieved context.
5. **Validation**: Responses are validated to ensure they remain grounded in the textbook content.

## Technology Stack

- **Framework**: FastAPI
- **LLM Service**: Cohere for embeddings and generation
- **Vector Database**: Qdrant Cloud
- **Metadata Storage**: Neon Serverless Postgres

## Setup

### Prerequisites

1. Python 3.8+
2. Cohere API key
3. Qdrant Cloud account and API key

### Installation

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Copy the example environment file and configure your keys:
   ```bash
   cp .env.example .env
   # Edit .env with your actual API keys and configuration
   ```

### Environment Variables

- `COHERE_API_KEY`: Your Cohere API key
- `QDRANT_URL`: Your Qdrant Cloud URL
- `QDRANT_API_KEY`: Your Qdrant API key
- `NEON_DATABASE_URL`: Your Neon Postgres database URL (optional)

## Running the Server

To start the development server:

```bash
uvicorn main:app --reload
```

Or run directly:
```bash
python main.py
```

The API will be available at `http://localhost:8000`.

## API Endpoints

### `GET /`
Health check endpoint to verify the server is running.

### `GET /api/health`
Detailed health check with service connectivity status.

### `POST /api/query`
Main endpoint for querying the textbook content.

**Request Body:**
```json
{
  "query": "Your question about the textbook",
  "query_type": "full_book",  // or "selected_text"
  "selected_text": "Optional selected text for selected_text queries"
}
```

**Response:**
```json
{
  "response": "Generated answer",
  "sources": [
    {
      "chapter": "Chapter Name",
      "section": "Section Name",
      "content": "Brief content snippet",
      "score": 0.85
    }
  ],
  "confidence": 0.78
}
```

## Configuration

The server supports the following environment variables:
- `HOST`: Host to bind to (default: 0.0.0.0)
- `PORT`: Port to bind to (default: 8000)