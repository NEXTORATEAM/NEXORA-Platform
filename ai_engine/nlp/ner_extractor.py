import os
import json
import re
import spacy
from spacy.pipeline import EntityRuler

def load_skills_from_directory() -> list:
    """
    قراءة المهارات ديناميكياً من مجلد skill_dictionaries (سواء كانت ملفات txt أو json).
    """
    skills = []
    # تجربة مسارات متعددة للوصول للمجلد بحسب مكان التشغيل
    possible_paths = [
        "data/skill_dictionaries",
        "../../data/skill_dictionaries",
        "../data/skill_dictionaries"
    ]
    
    dict_dir = None
    for path in possible_paths:
        if os.path.exists(path):
            dict_dir = path
            break

    if dict_dir:
        for filename in os.listdir(dict_dir):
            file_path = os.path.join(dict_dir, filename)
            try:
                if filename.endswith(".txt"):
                    with open(file_path, "r", encoding="utf-8") as f:
                        for line in f:
                            skill = line.strip()
                            if skill and not skill.startswith("#"):
                                skills.append(skill)
                elif filename.endswith(".json"):
                    with open(file_path, "r", encoding="utf-8") as f:
                        data = json.load(f)
                        if isinstance(data, list):
                            skills.extend([str(s).strip() for s in data if str(s).strip()])
            except Exception as e:
                print(f"تحذير: لم نستطع قراءة الملف {filename}: {e}")

    # مهارات افتراضية احتياطية في حال كان المجلد فارغاً أو غير موجود
    if not skills:
        skills = [
            "Python", "FastAPI", "Flask", "React", "TailwindCSS", "Node.js",
            "SQL", "PostgreSQL", "MySQL", "ChromaDB", "MongoDB", "SQLite",
            "Machine Learning", "Deep Learning", "spaCy", "Pandas", "NumPy",
            "Scikit-learn", "PyTorch", "Transformers", "Docker", "Git", "Tableau", "Power BI", "LangChain"
        ]
    
    return list(set(skills))

def extract_degrees(text: str) -> list:
    """
    استخراج الدرجات العلمية والمؤهلات الأكاديمية بدقة باستخدام أنماط البحث (Regex).
    """
    degree_patterns = [
        r"Bachelor(?:\s+of\s+[A-Za-z\s]+)?",
        r"Master(?:\s+of\s+[A-Za-z\s]+)?",
        r"Ph\.?D\.?",
        r"B\.?Sc\.?",
        r"M\.?Sc\.?",
        r"B\.?A\.?",
        r"Bachelor of Science",
        r"Master of Science",
        r"Bachelor of Arts",
        r"Master of Arts",
        r"Artificial Intelligence Student",
        r"Information Technology Engineering"
    ]
    
    found_degrees = set()
    for pattern in degree_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for m in matches:
            found_degrees.add(m.strip())
            
    return list(found_degrees)

def extract_resume_entities(text: str) -> dict:
    """
    استخراج المهارات والكيانات من النص الخام للسيرة الذاتية 
    باستخدام spaCy و EntityRuler وقواميس المهارات الديناميكية.
    """
    # تحميل نموذج اللغة الإنجليزية الأساسي في spaCy
    try:
        nlp = spacy.load("en_core_web_sm")
    except OSError:
        os.system("python -m spacy download en_core_web_sm")
        nlp = spacy.load("en_core_web_sm")

    # إضافة مخصص الكيانات (EntityRuler) لاستخراج المهارات التقنية بدقة
    if "entity_ruler" not in nlp.pipe_names:
        ruler = nlp.add_pipe("entity_ruler", before="ner")
        
        # تحميل المهارات من المجلد ديناميكياً
        technical_skills = load_skills_from_directory()
        
        # تجهيز الأنماط (Patterns) لقاعدة الاستخراج
        patterns = [{"label": "SKILL", "pattern": skill} for skill in technical_skills]
        try:
            ruler.add_patterns(patterns)
        except Exception:
            pass # لتجنب التكرار في الأنماط إذا تم استدعاء الدالة أكثر من مرة

    # معالجة النص عبر محرك spaCy
    doc = nlp(text)

    extracted_skills = set()
    extracted_orgs = set()

    # المرور على الكيانات المكتشفة في النص عبر spaCy
    for ent in doc.ents:
        if ent.label_ == "SKILL":
            extracted_skills.add(ent.text)
        elif ent.label_ == "ORG":
            extracted_orgs.add(ent.text)

    # استخراج الدرجات العلمية عبر دالة البحث المحسنة
    extracted_degrees = extract_degrees(text)

    return {
        "skills": list(extracted_skills),
        "organizations": list(extracted_orgs),
        "degrees": extracted_degrees
    }

# مثال تجريبي للاختبار المباشر
if __name__ == "__main__":
    sample_text = """
    Azhar Raji - Artificial Intelligence Student at Al-Nasser University.
    Holds a Bachelor of Science in Artificial Intelligence. 
    Experienced in Python, Pandas, Flask, Docker, and Machine Learning.
    """
    result = extract_resume_entities(sample_text)
    print("النتائج المستخرجة بعد التحسين:")
    print(json.dumps(result, indent=4, ensure_ascii=False))