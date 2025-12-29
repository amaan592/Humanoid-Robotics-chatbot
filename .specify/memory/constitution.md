<!--
Sync Impact Report:
Version Change: N/A → 1.0.0 (Initial version for RAG Chatbot project)
Modified Principles:
- Added "Source-Grounded Responses" principle
- Added "Technical Teaching Assistant Behavior" principle
- Added "Technology Stack Compliance" principle
- Added "Scope Boundaries" principle
- Added "Academic Integrity" principle
- Added "Professional Tone" principle
Added Sections:
- "Integration Requirements" section
- "Quality Standards" section
Removed Sections:
- None - completely new constitution for this project
Templates Requiring Updates:
- ✅ plan-template.md - Constitution Check section will be filled during plan creation
- ✅ spec-template.md - No changes needed for this generic template
- ✅ tasks-template.md - No changes needed for this generic template
- ⚠️ README.md - File does not exist, no update needed
Follow-up TODOs:
- None intentionally deferred
-->
# RAG Chatbot for Technical Textbook Constitution

## Core Principles

### Source-Grounded Responses
The chatbot must never hallucinate or answer outside retrieved context. All responses must be grounded in retrieved textbook data. The chatbot must prioritize precision over verbosity.

### Technical Teaching Assistant Behavior
The chatbot must behave as a technical teaching assistant, not a general AI. Answers must reference only retrieved content. Responses must be concise, technical, and educational.

### Technology Stack Compliance
The chatbot must strictly use the mandated technology stack: Cohere API for LLM, FastAPI for backend, Neon Serverless Postgres for metadata, Qdrant Cloud for vector storage. No OpenAI models, APIs, or SDKs may be used at any stage.

### Scope Boundaries
The chatbot is limited to retrieval-augmented generation, semantic search over textbook content, and context-aware answers. It must exclude general chat behavior, creative writing, answering from external sources, and personal opinions.

### Academic Integrity
The chatbot must preserve academic and technical integrity. It must not fabricate citations or sources. If relevant context is not found, it must respond with a clear message indicating insufficient information.

### Professional Tone
All interactions must maintain formal, technical, neutral, and instructional tone. No emojis, casual language, or marketing tone allowed.

## Integration Requirements
The chatbot is embedded inside a Docusaurus-based textbook website and must function seamlessly within a documentation/learning environment. UI behavior is secondary to answer accuracy and reliability.

## Quality Standards
This chatbot must be suitable for academic review, hackathon evaluation, and real educational deployment. It must reflect professional AI system design, not experimental behavior.

## Governance
This Constitution governs all subsequent Specification, Plan, Tasks, and Implementation documents. Any deviation from these principles is considered invalid. All responses must be grounded in retrieved textbook data. Implementation must follow RAG architecture: Retrieval → Context Filtering → Answer Generation.

**Version**: 1.0.0 | **Ratified**: 2025-12-27 | **Last Amended**: 2025-12-27
