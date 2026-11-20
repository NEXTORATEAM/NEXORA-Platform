import os
import json
import re
import spacy

def normalize_text(text: str) -> str:
    """
    تطبيع النصوص العامة (عربي وإنجليزي) لتوحيد المسافات والأحرف وإزالة التشكيل.
    """
    if not text:
        return ""
    # إزالة تشكيل الحروف العربية
    text = re.sub(r'[\u064b-\u0652]', '', text)
    # توحيد المسافات الزائدة
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_degrees(text: str) -> list:
    """
    استخراج الدرجات العلمية والمؤهلات بمختلف التخصصات (إدارة أعمال، هندسة، تقنية، طب...).
    """
    degree_patterns = [
        # إنجليزي
        r"Bachelor(?:\s+of\s+[A-Za-z\s]+)?",
        r"Master(?:\s+of\s+[A-Za-z\s]+)?",
        r"Ph\.?D\.?",
        r"B\.?Sc\.?", r"M\.?Sc\.?", r"B\.?A\.?", r"M\.?A\.?",
        # عربي
        r"بكالوريوس",
        r"ماجستير",
        r"دكتوراه",
        r"دبلوما?",
        r"ليسانس",
        r"خريجة؟\s+[أ-ي\s]+"
    ]
    
    found_degrees = set()
    for pattern in degree_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for m in matches:
            found_degrees.add(m.strip())
            
    return list(found_degrees)

def extract_resume_entities(text: str, dynamic_skills: list = None) -> dict:
    """
    استخراج الكيانات والمهارات ديناميكياً لجميع التخصصات والمجالات (عربي وإنجليزي) 
    دون الاعتماد على أي قوائم ثابتة أو كلمات مخصصة.
    """
    # تحميل نموذج spaCy (نستخدم النموذج القياسي ويمكن توسعته)
    try:
        nlp = spacy.load("en_core_web_sm")
    except OSError:
        os.system("python -m spacy download en_core_web_sm")
        nlp = spacy.load("en_core_web_sm")

    # معالجة النص وتطبيعه
    clean_full_text = normalize_text(text)
    doc = nlp(clean_full_text)

    extracted_skills = set()
    extracted_orgs = set()

    # 1. استخراج المنظمات والجهات (شركات، جامعات...) من الكيانات المسماة
    for ent in doc.ents:
        if ent.label_ in ["ORG", "GPE"]:
            extracted_orgs.add(ent.text)

    # 2. الاستخراج الديناميكي للمهارات بناءً على متطلبات الوظيفة المُدخلة من الـ HR
    text_lower = clean_full_text.lower()
    
    if dynamic_skills:
        for req in dynamic_skills:
            # تقسيم المتطلبات إن وجدت بفواصل عربية أو إنجليزية
            sub_reqs = req.replace("،", ",").split(",")
            for sub_req in sub_reqs:
                clean_req = sub_req.strip().lower()
                if not clean_req:
                    continue
                
                # التحقق هل المتطلب موجود كجملة أو كلمات مفتاحية داخل السيرة الذاتية
                # يدعم أي تخصص (إدارة أعمال، محاسبة، برمجيات، تسويق...)
                keywords = [kw for kw in clean_req.split() if len(kw) > 2]
                
                if clean_req in text_lower:
                    extracted_skills.add(sub_req.strip())
                elif keywords:
                    # إذا وجدت معظم الكلمات المفتاحية للمتطلب في النص
                    matches = sum(1 for kw in keywords if kw in text_lower)
                    if matches >= len(keywords) / 2:
                        extracted_skills.add(sub_req.strip())
    
    # 3. إذا لم تُمرر متطلبات محددة، يستخرج النظام المصطلحات والعبارات البارزة تلقائياً (Noun Chunks)
    if not extracted_skills:
        for chunk in doc.noun_chunks:
            term = chunk.text.strip()
            if len(term) > 3 and not term.isdigit():
                extracted_skills.add(term)

    # استخراج المؤهلات والدرجات العلمية
    extracted_degrees = extract_degrees(text)

    return {
        "skills": list(extracted_skills),
        "organizations": list(extracted_orgs),
        "degrees": extracted_degrees
    }