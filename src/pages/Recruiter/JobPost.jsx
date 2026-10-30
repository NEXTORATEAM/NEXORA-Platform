import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function JobPost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    jobType: 'full-time',
    description: '',
    requirements: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // محاكاة إرسال البيانات للـ Backend
    setTimeout(() => {
      setIsLoading(false);
      // الانتقال مباشرة لصفحة رفع السير الذاتية (ZIP) بعد نشر الوظيفة
      navigate('/recruiter/batch-upload');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6 md:p-10 font-tajawal transition-colors duration-300" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl space-y-6 shadow-sm transition-colors duration-300">
          
          <div className="text-center space-y-2 border-b border-slate-100 dark:border-slate-800 pb-6">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white font-tajawal">نشر شاغر وظيفي جديد</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">أدخل تفاصيل الوظيفة لجذب وتصفية أفضل الكفاءات بالذكاء الاصطناعي</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* استخدام مكون الـ Input الجاهز */}
            <Input
              label="مسمى الوظيفة"
              type="text"
              name="title"
              placeholder="مثال: مطور واجهات أمامية (React)"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="القسم / المجال"
                type="text"
                name="department"
                placeholder="مثال: الهندسة والبرمجيات"
                value={formData.department}
                onChange={handleChange}
                required
              />
              <Input
                label="موقع العمل"
                type="text"
                name="location"
                placeholder="مثال: صنعاء / عن بعد"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">وصف الوظيفة</label>
              <textarea
                name="description"
                rows="4"
                placeholder="اكتب تفاصيل المهام والمسؤوليات..."
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-slate-900 border border-brand-light/40 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-brand-primary focus:ring-4 focus:ring-brand-soft/60 outline-none transition resize-none"
              ></textarea>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">المهارات والمتطلبات الأساسية</label>
              <textarea
                name="requirements"
                rows="3"
                placeholder="مثال: خبرة سنتين في React و Tailwind, معرفة بـ Git..."
                value={formData.requirements}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-slate-900 border border-brand-light/40 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-brand-primary focus:ring-4 focus:ring-brand-soft/60 outline-none transition resize-none"
              ></textarea>
            </div>

            {/* استخدام مكون الـ Button الجاهز */}
            <Button 
              type="submit" 
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full py-3 mt-4"
            >
              نشر الوظيفة والانتقال لرفع السير الذاتية
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}