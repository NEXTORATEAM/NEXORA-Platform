import os
import sys

# إضافة مجلد الـ src إلى مسار بايثون لحل مشاكل الـ ModuleNotFoundError تماماً
current_dir = os.path.dirname(os.path.abspath(__file__))
src_dir = os.path.abspath(os.path.join(current_dir, "../../"))
if src_dir not in sys.path:
    sys.path.insert(0, src_dir)

import chromadb
from ai_engine.nlp.embedder import ResumeEmbedder

class NEXORAVectorStore:
    """
    إدارة قاعدة البيانات المتجهية (ChromaDB) لمنصة NEXORA:
    تخزين وسحب متجهات السير الذاتية والوظائف للبحث الدلالي السريع.
    """
    def __init__(self, persist_directory: str = "data/chroma_db"):
        # تهيئة قاعدة البيانات محلياً داخل مجلد المشروع
        self.client = chromadb.PersistentClient(path=persist_directory)
        
        # إنشاء أو استدعاء مجموعة خاصة بالسير الذاتية للمتقدمين
        self.collection = self.client.get_or_create_collection(name="nexora_resumes")
        self.embedder = ResumeEmbedder()

    def add_resume(self, resume_id: str, resume_text: str, metadata: dict):
        """
        توليد المتجه الخاص بالسيرة الذاتية وتخزينه في ChromaDB مع بياناتها الوصفية.
        """
        embedding = self.embedder.generate_embedding(resume_text)
        if not embedding:
            return False

        self.collection.upsert(
            ids=[resume_id],
            embeddings=[embedding],
            documents=[resume_text],
            metadatas=[metadata]
        )
        return True

    def search_matching_resumes(self, job_description: str, top_k: int = 3):
        """
        البحث الدلالي عن أفضل السير الذاتية المطابقة لوصف الوظيفة الذي أدخله مسؤول الـ HR.
        """
        job_embedding = self.embedder.generate_embedding(job_description)
        if not job_embedding:
            return []

        results = self.collection.query(
            query_embeddings=[job_embedding],
            n_results=top_k
        )
        return results

# مثال تجريبي للاختبار المباشر
if __name__ == "__main__":
    vector_store = NEXORAVectorStore()
    
    # إضافة سيرة ذاتية تجريبية للقاعدة
    vector_store.add_resume(
        resume_id="resume_001",
        resume_text="AI and Data Science student skilled in Python, Machine Learning, and NLP.",
        metadata={"name": "Azhar Raji", "degree": "Bachelor of Science in Artificial Intelligence"}
    )

    # بحث تجريبي لوظيفة
    job_desc = "Looking for an Artificial Intelligence specialist with Python and Machine Learning experience."
    search_results = vector_store.search_matching_resumes(job_desc, top_k=1)
    
    print("--- نتائج البحث الدلالي من ChromaDB ---")
    print(search_results)