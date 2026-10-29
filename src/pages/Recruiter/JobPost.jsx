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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Posted:', formData);
    alert('تم نشر الوظيفة بنجاح!');
    navigate('/recruiter/applicants'); // الانتقال لصفحة المرشحين بعد النشر
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6" dir="rtl">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-brand-darker font-tajawal">نشر شغور وظيفي جديد</h1>
          <p className="text-sm text-slate-500">أدخل تفاصيل الوظيفة لجذب أفضل الكفاءات المرشحة بالذكاء الاصطناعي</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="text-sm font-semibold text-slate-700">وصف الوظيفة</label>
            <textarea
              name="description"
              rows="4"
              placeholder="اكتب تفاصيل المهام والمسؤوليات..."
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none"
              required
            ></textarea>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">المهارات والمتطلبات الأساسية</label>
            <textarea
              name="requirements"
              rows="3"
              placeholder="مثال: خبرة سنتين في React و Tailwind, معرفة بـ Git..."
              value={formData.requirements}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none"
              required
            ></textarea>
          </div>

          <Button type="submit" variant="primary" className="w-full py-2.5">
            نشر الوظيفة الآن
          </Button>
        </form>
      </div>
    </div>
  );
}