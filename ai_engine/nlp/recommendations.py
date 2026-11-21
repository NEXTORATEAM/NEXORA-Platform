import re
import os
import json
import chromadb
from sentence_transformers import SentenceTransformer

# تحميل نموذج المتجهات الدلالي متعدد اللغات (يدعم العربية والإنجليزية معاً)
_model = None
def get_embedding_model():
    global _model
    if _model is None:
        _model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
    return _model


# تهيئة قاعدة بيانات المتجهات ChromaDB بشكل مستمر (Persistent)
CHROMA_PATH = os.path.join(os.path.dirname(__file__), "..", "chroma_db")
chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
career_collection = chroma_client.get_or_create_collection(
    name="dynamic_career_paths",
    metadata={"hnsw:space": "cosine"}  # استخدام تشابه جيب التمام (Cosine Similarity)
)


def normalize_skill_text(text: str) -> str:
    if not text:
        return ""
    text = text.strip().lower()
    text = re.sub(r'[\u064b-\u0652]', '', text)
    text = re.sub(r'[أإآ]', 'ا', text)
    text = text.replace('ة', 'ه').replace('ى', 'ي')
    return re.sub(r'\s+', ' ', text)


def upsert_career_path_to_vector_db(path_id: str, path_title: str, description_and_skills: str, source: str = "system"):
    """
    دالة ديناميكية لإضافة أو تحديث أي مسار مهني أو وظيفة جديدة داخل ChromaDB تلقائياً
    (تُستدعى عند إضافة وظيفة جديدة من لوحة الشركات أو استيراد ملف مسارات خارجي).
    """
    model = get_embedding_model()
    embedding = model.encode(description_and_skills).tolist()
    
    career_collection.upsert(
        ids=[str(path_id)],
        embeddings=[embedding],
        documents=[description_and_skills],
        metadatas=[{"path_title": path_title, "source": source}]
    )


def seed_initial_careers_if_empty(json_file_path: str = None):
    """
    تهيئة أولية تلقائية لمرة واحدة فقط إذا كانت قاعدة المتجهات فارغة تماماً،
    تقرأ من ملف JSON خارجي قابل للتعديل دون لمس الكود البرمجي.
    """
    if career_collection.count() > 0:
        return

    default_path = json_file_path or os.path.join(os.path.dirname(__file__), "careers_catalog.json")
    if os.path.exists(default_path):
        with open(default_path, "r", encoding="utf-8") as f:
            catalog = json.load(f)
        for item in catalog:
            upsert_career_path_to_vector_db(
                path_id=item["id"],
                path_title=item["title"],
                description_and_skills=item["skills_text"],
                source="catalog"
            )


def recommend_career_paths(candidate_skills: list, dynamic_jobs: list = None, top_k: int = 3) -> list:
    """
    اقتراح المسارات المهنية والوظائف المناسبة ديناميكياً باستخدام البحث الدلالي في ChromaDB.
    - candidate_skills: مهارات المرشح المستخرجة.
    - dynamic_jobs: (اختياري) قائمة الوظائف الحية القادمة من قاعدة بيانات Backend لدمجها فوراً.
    """
    if not candidate_skills:
        return []

    # 1. مزامنة أي وظائف حقيقية أضافتها الشركات في قاعدة البيانات مع محرك التوصيات
    if dynamic_jobs:
        for job in dynamic_jobs:
            upsert_career_path_to_vector_db(
                path_id=f"job_{job['id']}",
                path_title=job["title"],
                description_and_skills=f"{job['title']} - {job.get('requirements', '')}",
                source="company_job"
            )

    # 2. التأكد من وجود بيانات مرجعية إذا لم تضف الشركات وظائف بعد
    seed_initial_careers_if_empty()

    if career_collection.count() == 0:
        return []

    # 3. تحويل مهارات المرشح إلى متجه دلالي والبحث عن أقرب المسارات في ChromaDB
    model = get_embedding_model()
    candidate_profile_text = ", ".join(candidate_skills)
    query_embedding = model.encode(candidate_profile_text).tolist()

    results = career_collection.query(
        query_embeddings=[query_embedding],
        n_results=min(top_k, career_collection.count())
    )

    recommendations = []
    if results and results.get("ids") and results["ids"][0]:
        for idx in range(len(results["ids"][0])):
            # في ChromaDB مع cosine، المسافة (distance) تتراوح بين 0 و 2، والتشابه = 1 - distance
            distance = results["distances"][0][idx]
            similarity_score = max(0.0, min(100.0, (1.0 - distance) * 100))

            if similarity_score >= 25.0:  # عتبة التوافق الدلالي
                meta = results["metadatas"][0][idx]
                doc_text = results["documents"][0][idx]
                
                # تحديد المهارات المشتركة للعرض التوضيحي
                matched = [
                    s for s in candidate_skills
                    if normalize_skill_text(s) in normalize_skill_text(doc_text)
                ]

                recommendations.append({
                    "path_title": meta.get("path_title", "مسار مهني مقترح"),
                    "match_score": round(similarity_score, 2),
                    "source": meta.get("source", "vector_db"),
                    "matched_skills": matched[:6]
                })

    recommendations.sort(key=lambda x: x["match_score"], reverse=True)
    return recommendations


def generate_learning_recommendations(missing_skills: list) -> list:
    """
    توليد خطة تعلم ديناميكية لكل مهارة ناقصة، مع قراءة المصادر من ملف خارجي إذا توفر.
    """
    if not missing_skills:
        return []

    resources_path = os.path.join(os.path.dirname(__file__), "learning_catalog.json")
    external_resources = {}
    if os.path.exists(resources_path):
        with open(resources_path, "r", encoding="utf-8") as f:
            external_resources = {normalize_skill_text(k): v for k, v in json.load(f).items()}

    learning_plan = []
    seen_skills = set()

    for skill in missing_skills:
        clean_raw = skill.strip()
        norm_skill = normalize_skill_text(clean_raw)
        if not norm_skill or norm_skill in seen_skills:
            continue

        seen_skills.add(norm_skill)

        # البحث في الكتالوج الخارجي إن وُجد، وإلا توليد توصية تعليمية مهيكلة ديناميكياً
        if norm_skill in external_resources:
            action = external_resources[norm_skill]
        else:
            action = {
                "course_title": f"مسار تدريبي تطبيقي لإتقان مهارة: {clean_raw}",
                "search_query": f"{clean_raw} full course certification",
                "focus_area": f"تطبيق عملي وبناء مشاريع مصغرة في {clean_raw}"
            }

        learning_plan.append({
            "skill": clean_raw,
            "recommended_action": action
        })

    return learning_plan