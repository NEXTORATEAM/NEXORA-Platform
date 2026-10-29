import os

# تعريف هيكل المجلدات والملفات بناءً على مخطط NEXORA Backend
structure = {
    "NEXORA_Backend": {
        "app": {
            "main.py": "# الملف الرئيسي لتشغيل FastAPI وإعدادات CORS\n",
            "api": {
                "v1": {
                    "router.py": "# تجميع كل مسارات الـ API في مكان واحد\n",
                    "endpoints": {
                        "auth.py": "# تسجيل الدخول وتوليد التوكين JWT\n",
                        "candidates.py": "# Candidate APIs - Sprint 1 (رفع السير الذاتية وإدارتها)\n",
                        "recruiters.py": "# Recruiter APIs (نشر الوظائف ورفع ملفات الـ ZIP)\n",
                        "matching.py": "# استدعاء نتائج مطابقة الـ ATS وتحليل الفجوة\n",
                        "analytics.py": "# Market Radar (بيانات رادار المهارات والإحصائيات)\n",
                    },
                }
            },
            "core": {
                "config.py": "# قراءة متغيرات البيئة env وبورت السيرفر\n",
                "security.py": "# تشفير كلمات المرور Passlib/Bcrypt وإنشاء JWT Tokens\n",
                "database.py": "# إعداد الربط بـ PostgreSQL عبر SQLAlchemy Engine\n",
            },
            "db": {
                "base.py": "# استيراد كافة الـ Models لإنشائها تلقائياً\n",
                "session.py": "# إنشاء جلسات الاتصال get_db dependency\n",
            },
            "models": {
                "user.py": "# جدول المستخدمين الطلاب والشركات[cite: 8]\n",
                "job_post.py": "# جدول الشواغر الوظيفية[cite: 8]\n",
                "resume.py": "# جدول السير الذاتية والملفات المرفوعة[cite: 8]\n",
                "analysis_result.py": "# جدول نتائج تحليل ATS والتقارير[cite: 8]\n",
            },
            "schemas": {
                "user.py": "# شروط إدخال واستجابة التسجيل والدخول[cite: 8]\n",
                "job_post.py": "# شروط بيانات الوظائف المنشورة[cite: 8]\n",
                "resume.py": "# شروط بيانات السير الذاتية المرفوعة[cite: 8]\n",
                "analysis.py": "# شكل مخرجات الـ ATS ورادار المهارات[cite: 8]\n",
            },
            "services": {
                "file_service.py": "# حفظ وتخزين ملفات الـ PDF والـ ZIP واستخراجها[cite: 8]\n",
                "ai_client.py": "# التوصيل وتمرير النصوص لمحرك الذكاء الاصطناعي AI Engine[cite: 8]\n",
            },
            "ai_engine": {
                "parsers": {
                    "pdf_parser.py": "# استخراج النصوص باستخدام pdfplumber\n",
                    "docx_parser.py": "# استخراج النصوص باستخدام python-docx\n",
                },
                "nlp": {
                    "text_cleaner.py": "# تنظيف النصوص\n",
                    "entity_extractor.py": "# تنظيم المهارات باستخدام spaCy\n",
                },
                "matching": {
                    "matcher.py": "# حساب التطابق الدلالي و Cosine Similarity\n",
                },
            },
        },
        "uploads": {},  # مجلد التخزين المؤقت لملفات الـ CVs و ZIPS[cite: 9]
        ".env": "# متغيرات البيئة: قاعدة البيانات، المفاتيح السرية، JWT Secret[cite: 9]\n",
        "requirements.txt": "fastapi\nuvicorn\npsycopg2-binary\nsqlalchemy\npydantic\npasslib\npython-jose\n",
        "README.md": "# دليل تشغيل الباك إند[cite: 9]\n",
    }
}


def create_structure(base_path, obj):
    for name, content in obj.items():
        current_path = os.path.join(base_path, name)
        if isinstance(content, dict):
            # إنشاء مجلد
            os.makedirs(current_path, exist_ok=True)
            create_structure(current_path, content)
        else:
            # إنشاء ملف مع كتابة محتوى افتراضي (إن وجد)
            if not os.path.exists(current_path):
                with open(current_path, "w", encoding="utf-8") as f:
                    f.write(content)


if __name__ == "__main__":
    print("🚀 جاري إنتاج هيكل الباك إند لـ NEXORA تلقائياً...")
    create_structure(".", structure)
    print("✨ تم إنشاء الهيكل بنجاح تام وجاهز لـ Git!")