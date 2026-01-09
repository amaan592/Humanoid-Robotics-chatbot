# Physical AI & Humanoid Robotics Textbook with RAG Chatbot

This repository contains the source code for the "Physical AI & Humanoid Robotics" textbook with an integrated Retrieval-Augmented Generation (RAG) chatbot. The textbook is built with Docusaurus, and the chatbot provides an intelligent interface for querying textbook content.

## 📚 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Repository Structure](#-repository-structure)
- [Setup Instructions](#-setup-instructions)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [Content Ingestion](#-content-ingestion)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Interactive Textbook**: Modern Docusaurus-based textbook interface
- **AI-Powered Chatbot**: Ask questions about textbook content and get accurate answers
- **Floating Chatbot Interface**: Chatbot icon appears at the bottom of every page for easy access
- **Selected Text Queries**: Ask questions about specific text you've highlighted
- **Source Attribution**: All answers include references to textbook chapters and sections
- **Confidence Scoring**: Responses include confidence levels for reliability
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Automatic theme switching

## 🏗️ Architecture

The system follows a RAG (Retrieval-Augmented Generation) architecture:

```
[User] → [Docusaurus Frontend] → [FastAPI Backend] → [Cohere + Qdrant]
```

### Components:
- **Frontend**: React-based Docusaurus site with chatbot component
- **Backend**: FastAPI service with Cohere and Qdrant integration
- **Vector Database**: Qdrant Cloud for semantic search
- **LLM Service**: Cohere for embeddings and generation

## 📁 Repository Structure

```
├── backend/                 # FastAPI backend with RAG implementation
│   ├── main.py             # Main API application
│   ├── models.py           # Pydantic models
│   ├── ingest.py           # Content ingestion pipeline
│   ├── test_api.py         # API tests
│   ├── requirements.txt    # Python dependencies
│   ├── README.md           # Backend documentation
│   └── start.sh/start.bat  # Startup scripts
├── textbook/               # Docusaurus textbook site
│   ├── docs/              # Textbook content
│   ├── src/               # Custom components (including Chatbot)
│   ├── pages/             # Static pages (including chatbot page)
│   ├── sidebars.js        # Navigation configuration
│   └── docusaurus.config.js # Site configuration
├── specs/002-rag-chatbot/  # Specification and implementation artifacts
│   ├── spec.md            # Feature specification
│   ├── plan.md            # Implementation plan
│   └── tasks.md           # Implementation tasks
└── CLAUDE.md              # Claude Code configuration
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js 16+ (for frontend)
- Python 3.8+ (for backend)
- Cohere API key
- Qdrant Cloud account

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Copy the example environment file and configure your keys:
   ```bash
   cp .env.example .env
   # Edit .env with your actual API keys and configuration
   ```

5. Set up environment variables:
   - `COHERE_API_KEY`: Your Cohere API key
   - `QDRANT_URL`: Your Qdrant Cloud URL
   - `QDRANT_API_KEY`: Your Qdrant API key

6. Start the backend server:
   ```bash
   # Using startup script:
   ./start.sh      # On Linux/Mac
   start.bat       # On Windows

   # Or directly with uvicorn:
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the textbook directory:
   ```bash
   cd textbook
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The textbook will be available at `http://localhost:3000`

## 📤 Content Ingestion

To populate the vector database with textbook content:

1. Ensure your backend server is running
2. Run the ingestion script:
   ```bash
   cd backend
   python ingest.py --docs-dir ../textbook/docs
   ```

This will process all markdown files in the textbook docs directory, chunk them appropriately, generate embeddings, and store them in Qdrant.

## 🌐 API Endpoints

### Backend API (default: http://localhost:8000)

- `GET /` - Health check
- `GET /api/health` - Detailed health check
- `POST /api/query` - Main query endpoint

#### Query Endpoint Request Body:
```json
{
  "query": "Your question about the textbook",
  "query_type": "full_book",  // or "selected_text"
  "selected_text": "Optional selected text for selected_text queries"
}
```

#### Query Endpoint Response:
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

## 💻 Chatbot Integration

The chatbot is integrated in three ways:

1. **Floating Chatbot Icon**: Appears at the bottom right of every page for instant access
2. **Dedicated Chatbot Page**: Available at `/chatbot` route
3. **Inline Component**: Can be embedded in any page using the Chatbot React component

To embed the chatbot in a page, use:
```jsx
import Chatbot from '@site/src/components/Chatbot';

<Chatbot apiEndpoint="http://localhost:8000/api/query" />
```

## 🚀 Deployment

The application consists of two parts that need to be deployed separately:
1. **Frontend**: The Docusaurus textbook with chatbot interface
2. **Backend**: The FastAPI server that handles chatbot queries

### Frontend Deployment (Textbook with Chatbot)

The Docusaurus site can be deployed to various platforms:

- **GitHub Pages**: Use `npm run deploy`
- **Vercel**:
  1. Install Vercel CLI: `npm install -g vercel`
  2. Login: `vercel login`
  3. Navigate to the textbook directory: `cd textbook`
  4. Deploy: `vercel`
  5. During setup, set environment variable: `REACT_APP_API_ENDPOINT=https://your-backend-deployment-url/api/query`
- **Netlify**: Connect your GitHub repository
- **AWS S3/CloudFront**: Build and upload static files

### Backend Deployment

The FastAPI backend can be deployed to:

- **Heroku**: Use the provided Procfile approach
- **Railway**: Deploy directly from GitHub
- **AWS EC2/ECS**: Containerize with Docker
- **Google Cloud Run**: Containerize with Docker
- **Azure App Service**: Deploy as web app

### Docker Deployment (Coming Soon)

A Dockerfile will be provided for containerized deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please open an issue in the GitHub repository.

## 🙏 Acknowledgments

- Built with [Docusaurus](https://docusaurus.io/)
- Powered by [Cohere](https://cohere.ai/) for embeddings and generation
- Vector database by [Qdrant](https://qdrant.tech/)
- Backend framework [FastAPI](https://fastapi.tiangolo.com/)