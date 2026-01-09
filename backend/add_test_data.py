import os
from dotenv import load_dotenv
load_dotenv()

import cohere
from qdrant_client import QdrantClient
from qdrant_client.http import models
from qdrant_client.models import PointStruct

# Initialize Cohere client
cohere_api_key = os.getenv("COHERE_API_KEY")
co = cohere.Client(cohere_api_key)

# Initialize in-memory Qdrant client
qdrant_client = QdrantClient(":memory:")

# Define collection name
COLLECTION_NAME = "textbook_content"

# Create collection
qdrant_client.create_collection(
    collection_name=COLLECTION_NAME,
    vectors_config=models.VectorParams(
        size=4096,  # Cohere's large model returns 4096-dimensional vectors
        distance=models.Distance.COSINE
    )
)

# Sample content about robotics
sample_texts = [
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

# Generate embeddings for sample content
for i, text_obj in enumerate(sample_texts):
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

print("Sample data added to in-memory Qdrant collection!")
print(f"Added {len(sample_texts)} sample documents to collection: {COLLECTION_NAME}")