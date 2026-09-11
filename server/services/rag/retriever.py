from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import Pinecone
from core.config import settings


def get_relevant_docs(pdf_hash: str, query: str):
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    try:
        vector_db = Pinecone.from_existing_index(
            index_name=settings.PINECONE_INDEX_NAME,
            embedding=embeddings,
            namespace=pdf_hash
        )
        return vector_db.similarity_search(query, k=2)
    except Exception as e:
        print(f"❌ Pinecone vector store retrieval error for PDF hash {pdf_hash}: {e}")
        return []
