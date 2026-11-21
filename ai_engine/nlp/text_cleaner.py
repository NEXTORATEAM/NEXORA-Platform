import re


def clean_text(text: str) -> str:
    """
    تنظيف النص مع الحفاظ على ترتيب الأسطر
    والعناوين الموجودة في السيرة الذاتية.
    """

    if not text:
        return ""

    # توحيد أنواع فواصل الأسطر
    text = text.replace("\r\n", "\n").replace("\r", "\n")

    # إزالة المسافات الزائدة داخل كل سطر
    lines = []

    for line in text.split("\n"):
        line = re.sub(r'[ \t]+', ' ', line).strip()

        if line:
            lines.append(line)

    # الاحتفاظ بفواصل الأسطر
    cleaned = "\n".join(lines)

    return cleaned.strip()


def extract_contact_info(text: str) -> dict:
    """
    استخراج البريد الإلكتروني ورقم الهاتف.
    """

    if not text:
        return {
            "email": None,
            "phone": None
        }

    email_pattern = (
        r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    )

    emails = re.findall(email_pattern, text)

    extracted_email = emails[0] if emails else None

    phone_pattern = (
        r'(?:\+?\d{1,3}[-.\s]?)?'
        r'\(?\d{2,4}\)?[-.\s]?'
        r'\d{3,4}[-.\s]?\d{3,4}'
    )

    phones = re.findall(phone_pattern, text)

    valid_phones = [
        phone.strip()
        for phone in phones
        if len(re.sub(r'\D', '', phone)) >= 7
    ]

    extracted_phone = valid_phones[0] if valid_phones else None

    return {
        "email": extracted_email,
        "phone": extracted_phone
    }