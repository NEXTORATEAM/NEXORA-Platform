from fastapi import APIRouter

router = APIRouter()

@router.get("/applicants")
def get_applicants():
    return [
        {
            "id": "1",
            "name": "أحمد علي",
            "role": "مطور واجهات أمامي",
            "initials": "أع",
            "matchScore": 88,
            "matchedSkills": ["React", "TailwindCSS", "JavaScript"],
            "missingSkills": ["TypeScript"],
            "summary": "مرشح ممتاز يمتلك خبرة عملية في تطوير واجهات React."
        }
    ]