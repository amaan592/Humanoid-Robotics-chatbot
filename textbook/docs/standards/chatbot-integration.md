---
title: Chatbot Integration
---

# Chatbot Integration

This document describes how the RAG (Retrieval-Augmented Generation) chatbot is integrated into the textbook.

## Features

- **Context-Aware Responses**: The chatbot provides answers based on the textbook content with proper source attribution.
- **Selected Text Queries**: Users can select text on the page and ask questions specifically about that text.
- **Confidence Scoring**: Responses include confidence scores to indicate reliability.
- **Source Attribution**: All responses include links to the relevant chapters and sections.

## Architecture

The chatbot follows a RAG (Retrieval-Augmented Generation) architecture:

1. **Query Processing**: User questions are processed and converted to embeddings using Cohere.
2. **Semantic Search**: Embeddings are searched against the textbook content in Qdrant vector database.
3. **Context Retrieval**: Most relevant content chunks are retrieved from the vector database.
4. **Response Generation**: Cohere generates answers based on the retrieved context.
5. **Validation**: Responses are validated to ensure they remain grounded in the textbook content.

## API Endpoints

- `/api/query` - General textbook queries
- `/api/query/selected` - Queries about selected text only

## Technology Stack

- **Frontend**: React component integrated in Docusaurus
- **Backend**: FastAPI with async support
- **LLM Service**: Cohere for embeddings and generation
- **Vector Database**: Qdrant Cloud
- **Metadata Storage**: Neon Serverless Postgres