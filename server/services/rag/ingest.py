from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import Pinecone
from pinecone import Pinecone as PineconeClient, ServerlessSpec
from core.config import settings
import tempfile, os

def ensure_pinecone_index():
    if not settings.PINECONE_API_KEY:
        print("⚠️ PINECONE_API_KEY is not set in environment variables.")
        return
    try:
        pc = PineconeClient(api_key=settings.PINECONE_API_KEY)
        existing_indexes = [idx.name for idx in pc.list_indexes()]
        if settings.PINECONE_INDEX_NAME not in existing_indexes:
            print(f"🌲 Pinecone index '{settings.PINECONE_INDEX_NAME}' not found. Creating it automatically...")
            pc.create_index(
                name=settings.PINECONE_INDEX_NAME,
                dimension=384,
                metric="cosine",
                spec=ServerlessSpec(cloud="aws", region="us-east-1")
            )
            print(f"✅ Pinecone index '{settings.PINECONE_INDEX_NAME}' created successfully!")
    except Exception as e:
        print(f"⚠️ Pinecone index check/creation warning: {e}")

async def ingest_pdf_for_rag(pdf_hash: str, pdf_bytes: bytes):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(pdf_bytes)
        tmp_path = tmp.name

    try:
        loader = PyPDFLoader(tmp_path)
        documents = loader.load()

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        docs = splitter.split_documents(documents)

        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        ensure_pinecone_index()

        Pinecone.from_documents(
            documents=docs,
            embedding=embeddings,
            index_name=settings.PINECONE_INDEX_NAME,
            namespace=pdf_hash
        )
        print(f"✅ Ingested PDF into Pinecone index '{settings.PINECONE_INDEX_NAME}' with namespace '{pdf_hash}'")
    except Exception as e:
        print(f"❌ Error ingesting PDF into Pinecone: {e}")
        raise e
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
