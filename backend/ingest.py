import os
import asyncio
from typing import List, Dict
import logging
from pathlib import Path

# Import required libraries
import cohere
from qdrant_client import QdrantClient
from qdrant_client.http import models
from qdrant_client.models import PointStruct

# Import models
from models import TextbookContentChunk

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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

qdrant_client = QdrantClient(
    url=qdrant_url,
    api_key=qdrant_api_key,
)

# Define collection name
COLLECTION_NAME = "textbook_content"

def create_collection():
    """
    Create the Qdrant collection for textbook content if it doesn't exist
    """
    try:
        # Check if collection exists
        collections = qdrant_client.get_collections()
        collection_names = [collection.name for collection in collections.collections]

        if COLLECTION_NAME not in collection_names:
            # Create collection with vector configuration
            qdrant_client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=models.VectorParams(
                    size=1024,  # Cohere's embed-english-v3.0 returns 1024-dimensional vectors
                    distance=models.Distance.COSINE
                )
            )
            logger.info(f"Created collection: {COLLECTION_NAME}")
        else:
            logger.info(f"Collection {COLLECTION_NAME} already exists")
    except Exception as e:
        logger.error(f"Error creating collection: {str(e)}")
        raise

def chunk_text(text: str, chunk_size: int = 1000, chunk_overlap: int = 100) -> List[str]:
    """
    Split text into overlapping chunks
    """
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size

        # If this is the last chunk, include the rest
        if end >= len(text):
            chunks.append(text[start:])
            break

        # Find a good break point (try to break at sentence or paragraph boundaries)
        chunk = text[start:end]

        # Look for a good break point if we're not at the end
        if end < len(text):
            # Look for the last sentence break in the last 100 characters
            for i in range(len(chunk) - 1, len(chunk) - chunk_overlap - 1, -1):
                if chunk[i] in ['.', '!', '?', '\n'] and i > len(chunk) // 2:
                    end = start + i + 1
                    break

        chunks.append(text[start:end])
        start = end

    return chunks

def process_markdown_file(file_path: str) -> List[Dict]:
    """
    Process a markdown file and extract content with chapter/section information
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract chapter and section information from the file
    # This is a simplified approach - in a real implementation, you'd want to parse the markdown properly
    lines = content.split('\n')
    chapter = "Unknown Chapter"
    section = "Unknown Section"

    # Try to find the first H1 for chapter title
    for line in lines:
        if line.startswith('# '):
            chapter = line[2:].strip()
            break

    # Try to find the first H2 for section title
    for line in lines:
        if line.startswith('## '):
            section = line[3:].strip()
            break

    # Remove markdown headers from content
    content_lines = []
    for line in lines:
        if not line.startswith('#'):
            content_lines.append(line)

    content = '\n'.join(content_lines).strip()

    return [{
        'content': content,
        'chapter': chapter,
        'section': section,
        'source_path': file_path
    }]

async def embed_and_store_chunks(chunks: List[Dict]):
    """
    Generate embeddings for chunks and store them in Qdrant
    """
    # Prepare texts for embedding
    texts = [chunk['content'] for chunk in chunks]

    # Generate embeddings
    logger.info(f"Generating embeddings for {len(texts)} chunks...")
    response = co.embed(
        texts=texts,
        model="embed-english-v3.0",
        input_type="document"
    )
    embeddings = response.embeddings

    # Prepare points for Qdrant
    points = []
    for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
        point = PointStruct(
            id=i,
            vector=embedding,
            payload={
                "content": chunk['content'],
                "chapter": chunk['chapter'],
                "section": chunk['section'],
                "source_path": chunk['source_path']
            }
        )
        points.append(point)

    # Upload points to Qdrant
    logger.info(f"Uploading {len(points)} points to Qdrant...")
    qdrant_client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )

    logger.info(f"Successfully stored {len(points)} chunks in Qdrant")

async def ingest_textbook_docs(docs_dir: str):
    """
    Ingest all markdown files from the textbook docs directory
    """
    logger.info(f"Starting ingestion from directory: {docs_dir}")

    # Create collection if it doesn't exist
    create_collection()

    # Find all markdown files
    markdown_files = list(Path(docs_dir).rglob("*.md"))
    logger.info(f"Found {len(markdown_files)} markdown files")

    all_chunks = []

    for file_path in markdown_files:
        logger.info(f"Processing file: {file_path}")

        try:
            # Process the markdown file
            file_chunks = process_markdown_file(str(file_path))

            # Chunk the content if it's too long
            for chunk_info in file_chunks:
                content = chunk_info['content']
                if len(content) > 1000:  # If content is longer than 1000 chars, chunk it
                    text_chunks = chunk_text(content)
                    for text_chunk in text_chunks:
                        all_chunks.append({
                            'content': text_chunk,
                            'chapter': chunk_info['chapter'],
                            'section': chunk_info['section'],
                            'source_path': str(file_path)
                        })
                else:
                    all_chunks.append(chunk_info)

        except Exception as e:
            logger.error(f"Error processing file {file_path}: {str(e)}")
            continue

    logger.info(f"Total chunks to process: {len(all_chunks)}")

    # Process and store all chunks
    await embed_and_store_chunks(all_chunks)

    logger.info("Ingestion completed successfully!")

def main():
    """
    Main function to run the ingestion process
    """
    import argparse

    parser = argparse.ArgumentParser(description="Ingest textbook content into vector database")
    parser.add_argument("--docs-dir", required=True, help="Path to the textbook docs directory")

    args = parser.parse_args()

    # Verify environment variables
    if not os.getenv("COHERE_API_KEY"):
        raise ValueError("COHERE_API_KEY environment variable is required")

    if not os.getenv("QDRANT_URL") or not os.getenv("QDRANT_API_KEY"):
        raise ValueError("QDRANT_URL and QDRANT_API_KEY environment variables are required")

    # Run the ingestion
    asyncio.run(ingest_textbook_docs(args.docs_dir))

if __name__ == "__main__":
    main()