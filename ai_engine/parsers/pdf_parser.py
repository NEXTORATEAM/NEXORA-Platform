import pdfplumber
import os
import re


def calculate_extraction_quality(text: str) -> str:
    """
    تقييم مبدئي لجودة النص المستخرج.
    هذا التقييم لا يضمن صحة المعلومات المستخرجة.
    """
    if not text or len(text.strip()) < 50:
        return "Low"

    lines = [line.strip() for line in text.splitlines() if line.strip()]
    words = re.findall(r'\b[\w@.+-]+\b', text, re.UNICODE)

    if len(words) < 10 or len(lines) < 2:
        return "Low"

    readable_chars = sum(
        1 for char in text
        if char.isalnum() or char.isspace() or char in ".,@+-:/()"
    )

    ratio = readable_chars / max(len(text), 1)

    if ratio < 0.75:
        return "Low"

    return "High"


def extract_text_from_pdf(file_path: str) -> dict:
    """
    استخراج النص من ملفات PDF مع الحفاظ على فواصل الأسطر.
    """

    if not os.path.exists(file_path):
        return {
            "success": False,
            "error": "The file does not exist at the specified path."
        }

    extracted_pages = []

    try:
        with pdfplumber.open(file_path) as pdf:

            pages_count = len(pdf.pages)

            for page in pdf.pages:
                page_text = page.extract_text(
                    x_tolerance=2,
                    y_tolerance=3,
                    layout=False
                )

                if page_text:
                    extracted_pages.append(page_text.strip())

        extracted_text = "\n\n".join(extracted_pages).strip()

        quality_status = calculate_extraction_quality(extracted_text)

        return {
            "success": True,
            "file_type": "PDF",
            "pages": pages_count,
            "text": extracted_text,
            "extraction_quality": quality_status
        }

    except Exception as e:
        return {
            "success": False,
            "error": f"Error occurred while reading the PDF file: {str(e)}"
        }