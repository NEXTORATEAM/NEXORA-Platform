import re


# ==================================================
# 1. Resume Section Headers
# ==================================================

SECTION_HEADERS = {
    "skills": [
        "skills",
        "technical skills",
        "core skills",
        "key skills",
        "areas of expertise",
        "competencies",
        "professional skills",
        "مهارات",
        "المهارات",
        "المهارات التقنية",
        "المهارات الشخصية"
    ],

    "education": [
        "education",
        "academic background",
        "educational background",
        "qualifications",
        "academic qualifications",
        "التعليم",
        "المؤهلات",
        "المؤهلات العلمية",
        "المؤهل العلمي"
    ],

    "experience": [
        "experience",
        "work experience",
        "professional experience",
        "employment history",
        "career history",
        "work history",
        "الخبرات",
        "الخبرة",
        "الخبرة العملية",
        "الخبرات المهنية",
        "الخبرات العملية"
    ],

    "projects": [
        "projects",
        "academic projects",
        "personal projects",
        "professional projects",
        "المشاريع",
        "المشاريع الأكاديمية",
        "المشاريع الشخصية"
    ],

    "certifications": [
        "certifications",
        "certificates",
        "courses",
        "training",
        "الشهادات",
        "الدورات",
        "الدورات التدريبية"
    ]
}


# ==================================================
# 2. Text Normalization
# ==================================================

def normalize_text(text: str) -> str:

    if not text:
        return ""

    text = re.sub(r'[\u064b-\u0652]', '', text)

    lines = []

    for line in text.splitlines():

        line = re.sub(r'[ \t]+', ' ', line)
        line = line.strip()

        if line:
            lines.append(line)

    return "\n".join(lines)


def normalize_heading(line: str) -> str:

    line = line.lower().strip()

    line = re.sub(
        r'^[\s•●▪◦\-*]+',
        '',
        line
    )

    line = re.sub(
        r'[:：\-–—]+$',
        '',
        line
    )

    line = re.sub(
        r'[^a-z0-9\u0600-\u06ff\s]',
        '',
        line
    )

    return re.sub(r'\s+', ' ', line).strip()


# ==================================================
# 3. Section Detection
# ==================================================

def identify_section(line: str):

    heading = normalize_heading(line)

    for section_name, headings in SECTION_HEADERS.items():

        for header in headings:

            if heading == normalize_heading(header):
                return section_name

    return None


def extract_sections(text: str) -> dict:

    sections = {
        "skills": [],
        "education": [],
        "experience": [],
        "projects": [],
        "certifications": [],
        "other": []
    }

    current_section = "other"

    for line in text.splitlines():

        line = line.strip()

        if not line:
            continue

        detected_section = identify_section(line)

        if detected_section:

            current_section = detected_section
            continue

        sections[current_section].append(line)

    return sections


# ==================================================
# 4. Full Name Extraction
# ==================================================

def extract_full_name(text: str):

    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    ignored_exact = {
        "resume",
        "curriculum vitae",
        "cv",
        "personal information",
        "contact",
        "contact information",
        "profile",
        "professional profile",
        "about me",
        "personal details",
        "السيرة الذاتية",
        "المعلومات الشخصية",
        "معلومات التواصل",
        "الملف الشخصي"
    }

    ignored_phrases = [
        "personal information",
        "contact information",
        "curriculum vitae",
        "professional summary",
        "career objective"
    ]

    email_pattern = r'\S+@\S+\.\S+'
    url_pattern = r'(https?://|www\.)'

    for line in lines[:10]:

        normalized = normalize_heading(line)

        if normalized in ignored_exact:
            continue

        if any(
            phrase in normalized
            for phrase in ignored_phrases
        ):
            continue

        if re.search(email_pattern, line, re.IGNORECASE):
            continue

        if re.search(url_pattern, line, re.IGNORECASE):
            continue

        if re.search(r'\d', line):
            continue

        if len(line) > 45:
            continue

        words = line.split()

        if not 2 <= len(words) <= 4:
            continue

        if re.search(
            r'[@|•●▪◦:؛]',
            line
        ):
            continue

        if not re.fullmatch(
            r"[A-Za-z\u0600-\u06ff\s.'-]+",
            line
        ):
            continue

        ignored_titles = {
            "software engineer",
            "data scientist",
            "web developer",
            "student",
            "engineer",
            "developer",
            "graphic designer",
            "project manager"
        }

        if normalized in ignored_titles:
            continue

        return line

    return None


# ==================================================
# 5. Education Extraction
# ==================================================

def extract_degrees(text: str) -> list:

    patterns = [
        r'\bBachelor(?:\s+of\s+[A-Za-z]+(?:\s+[A-Za-z]+){0,3})?',
        r'\bMaster(?:\s+of\s+[A-Za-z]+(?:\s+[A-Za-z]+){0,3})?',
        r'\bPh\.?\s*D\.?',
        r'\bDoctorate\b',
        r'\bDiploma(?:\s+in\s+[A-Za-z]+(?:\s+[A-Za-z]+){0,3})?',
        r'\bAssociate(?:\s+Degree)?\b',

        r'بكالوريوس(?:\s+في\s+[\u0600-\u06ff]+(?:\s+[\u0600-\u06ff]+){0,3})?',
        r'ماجستير(?:\s+في\s+[\u0600-\u06ff]+(?:\s+[\u0600-\u06ff]+){0,3})?',
        r'دكتوراه(?:\s+في\s+[\u0600-\u06ff]+(?:\s+[\u0600-\u06ff]+){0,3})?',
        r'دبلوم(?:\s+في\s+[\u0600-\u06ff]+(?:\s+[\u0600-\u06ff]+){0,3})?',
        r'ليسانس'
    ]

    found = set()

    for pattern in patterns:

        matches = re.findall(
            pattern,
            text,
            flags=re.IGNORECASE
        )

        for match in matches:

            value = re.sub(
                r'\s+',
                ' ',
                match
            ).strip()

            if len(value) >= 4:
                found.add(value)

    return sorted(
        found,
        key=str.lower
    )


# ==================================================
# 6. Skills Extraction
# ==================================================

def extract_skills(
    sections: dict,
    dynamic_skills: list = None
) -> list:

    extracted = set()

    skills_lines = sections.get("skills", [])

    for line in skills_lines:

        line = re.sub(
            r'^[\s•●▪◦\-*]+',
            '',
            line
        ).strip()

        if not line:
            continue

        items = re.split(
            r'[,،;؛|•●▪◦]',
            line
        )

        for item in items:

            skill = item.strip()

            if (
                2 <= len(skill) <= 45
                and len(skill.split()) <= 5
                and not skill.isdigit()
            ):

                extracted.add(skill)

    # Match job requirements only when supplied
    if dynamic_skills:

        full_text = " ".join(
            line
            for lines in sections.values()
            for line in lines
        ).lower()

        for requirement in dynamic_skills:

            if not isinstance(requirement, str):
                continue

            items = re.split(
                r'[,،;؛]',
                requirement
            )

            for item in items:

                skill = item.strip()

                if (
                    skill
                    and len(skill) <= 45
                    and skill.lower() in full_text
                ):

                    extracted.add(skill)

    return sorted(
        extracted,
        key=str.lower
    )


# ==================================================
# 7. Organization Extraction
# ==================================================

def extract_organizations(
    text: str,
    sections: dict
) -> list:

    relevant_text = "\n".join(
        sections.get("education", []) +
        sections.get("experience", [])
    )

    if not relevant_text.strip():
        return []

    try:

        import spacy

        nlp = spacy.load("en_core_web_sm")

        doc = nlp(relevant_text)

        organizations = set()

        for entity in doc.ents:

            if entity.label_ != "ORG":
                continue

            name = entity.text.strip()

            name = re.sub(
                r'\s+',
                ' ',
                name
            )

            if len(name) < 3:
                continue

            if len(name.split()) > 6:
                continue

            organizations.add(name)

        return sorted(
            organizations,
            key=str.lower
        )

    except (ImportError, OSError):

        return []


# ==================================================
# 8. Main Resume Entity Extraction
# ==================================================

def extract_resume_entities(
    text: str,
    dynamic_skills: list = None
) -> dict:

    clean_full_text = normalize_text(text)

    sections = extract_sections(clean_full_text)

    full_name = extract_full_name(
        clean_full_text
    )

    degrees = extract_degrees(
        "\n".join(sections.get("education", []))
    )

    skills = extract_skills(
        sections,
        dynamic_skills
    )

    organizations = extract_organizations(
        clean_full_text,
        sections
    )

    return {
        "full_name": full_name,
        "skills": skills,
        "organizations": organizations,
        "degrees": degrees
    }
