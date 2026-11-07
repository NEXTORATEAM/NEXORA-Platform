from sentence_transformers import SentenceTransformer
import numpy as np

class ResumeEmbedder:
    """
    مهمة العضوة الأولى (Sprint 3): تحويل السير الذاتية والنصوص المستخرجة 
    إلى متجهات دلالية (Embeddings) باستخدام مكتبة sentence-transformers.
    """
    def __init__(self, model_name: str = 'all-MiniLM-L6-v2'):
        """
        تهيئة النموذج وخوارزمية التضمين المتجهي.
        تم اختيار all-MiniLM-L6-v2 لسرعتها وكفاءتها العالية في استخراج المعنى الدلالي.
        """
        print(f"جاري تحميل نموذج التضمين المتجهي ({model_name})...")
        self.model = SentenceTransformer(model_name)

    def generate_embedding(self, text: str) -> list:
        """
        تحويل نص مفرد (مثل السيرة الذاتية كاملة أو ملخص المهارات) إلى متجه رقمي.
        """
        if not text or not text.strip():
            return []
        
        # ترميز النص وتحويله إلى مصفوفة ثم إلى قائمة بايثون عادية
        embedding = self.model.encode(text, convert_to_tensor=False)
        return embedding.tolist()

    def calculate_similarity(self, resume_embedding: list, job_description_embedding: list) -> float:
        """
        حساب نسبة التشابه الدلالي (Cosine Similarity) بين السيرة الذاتية ووصف الوظيفة.
        """
        vec1 = np.array(resume_embedding)
        vec2 = np.array(job_description_embedding)
        
        # حساب الجداء السلبي المعياري (Cosine Similarity)
        cosine_score = np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))
        return float(cosine_score)

# مثال تجريبي للاختبار المباشر
if __name__ == "__main__":
    embedder = ResumeEmbedder()
    
    # نص تجريبي لسيرة ذاتية
    sample_resume = "Data Scientist skilled in Python, Machine Learning, PyTorch, and FastAPI."
    # متطلبات الوظيفة التي أدخلها مسؤول الـ HR
    sample_job_desc = "Looking for a Python Developer with strong background in Machine Learning and FastAPI."

    # توليد المتجهات
    resume_emb = embedder.generate_embedding(sample_resume)
    job_emb = embedder.generate_embedding(sample_job_desc)

    # حساب نسبة التطابق
    score = embedder.calculate_similarity(resume_emb, job_emb)
    
    print(f"طول المتجه الناتج: {len(resume_emb)}")
    print(f"نسبة التطابق الدلالي (Match Score): {score * 100:.2f}%")