import numpy as np
from sentence_transformers import SentenceTransformer, util

class GapAnalyzer:
    def __init__(self, model_name: str = 'all-MiniLM-L6-v2'):
        print("Loading gap analysis and semantic matching model...")
        self.model = SentenceTransformer(model_name)

    def analyze_gap(self, candidate_skills: list, job_requirements: list, threshold: float = 0.55) -> dict:
        """
        تحليل الفجوة وحساب معدل الـ ATS بناءً على المعادلة:
        ATS Score = (50% Direct/Semantic Skills Match) + (50% Semantic Similarity)
        """
        if not job_requirements:
            return {
                "match_percentage": 0.0,
                "matched_skills": [],
                "missing_skills": []
            }

        if not candidate_skills:
            return {
                "match_percentage": 0.0,
                "matched_skills": [],
                "missing_skills": job_requirements
            }

        # 1. حساب التشابه الدلالي الكلي للنصوص (Semantic Similarity)
        candidate_text = " ".join(candidate_skills)
        job_text = " ".join(job_requirements)
        
        embeddings = self.model.encode([candidate_text, job_text], convert_to_tensor=True)
        semantic_sim_score = float(util.cos_sim(embeddings[0], embeddings[1]).item())
        # تحويل النسبة المئوية الدلالية من 0-1 إلى 0-100
        semantic_percentage = max(0.0, min(100.0, semantic_sim_score * 100))

        # 2. حساب مطابقة المهارات المباشرة (Direct Skills Match)
        matched_skills = []
        missing_skills = []

        candidate_skills_lower = [s.lower().strip() for s in candidate_skills]

        for req in job_requirements:
            req_lower = req.lower().strip()
            found = False
            for c_skill in candidate_skills_lower:
                if req_lower in c_skill or c_skill in req_lower:
                    found = True
                    break
            
            if found:
                if req not in matched_skills:
                    matched_skills.append(req)
            else:
                if req not in missing_skills:
                    missing_skills.append(req)

        direct_match_percentage = (len(matched_skills) / len(job_requirements)) * 100

        # 3. تطبيق المعادلة المطلوبة: 50% مطابقة مهارات مباشرة + 50% تشابه دلالي
        final_ats_score = (0.50 * direct_match_percentage) + (0.50 * semantic_percentage)

        return {
            "match_percentage": round(final_ats_score, 2),
            "direct_match_percentage": round(direct_match_percentage, 2),
            "semantic_percentage": round(semantic_percentage, 2),
            "matched_skills": matched_skills,
            "missing_skills": missing_skills
        }