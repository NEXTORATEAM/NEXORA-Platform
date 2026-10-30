from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# استيراد كافة النماذج حتى يتمكن Base من التعرف عليها عند إنشاء الجداول
from app.db.models.user import User
from app.db.models.screening_batch import ScreeningBatch
from app.db.models.analysis_result import AnalysisResult