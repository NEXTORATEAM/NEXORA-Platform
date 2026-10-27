import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Register() {
  const [userType, setUserType] = useState('student'); // 'student' or 'recruiter'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register submitted:', { userType, ...formData });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-brand-darker font-tajawal">إنشاء حساب جديد في NEXORA</h1>
          <p className="text-sm text-slate-500">اختر نوع الحساب وابدأ رحلتك الذكية معنا</p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setUserType('student')}
            className={`py-2 text-sm font-medium rounded-lg transition-all ${
              userType === 'student'
                ? 'bg-white text-brand-darker shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            باحث عن عمل / طالب
          </button>
          <button
            type="button"
            onClick={() => setUserType('recruiter')}
            className={`py-2 text-sm font-medium rounded-lg transition-all ${
              userType === 'recruiter'
                ? 'bg-white text-brand-darker shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            شركة / مسؤول توظيف
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={userType === 'student' ? 'الاسم الكامل' : 'اسم الشركة / المسؤول'}
            type="text"
            name="name"
            placeholder={userType === 'student' ? 'أدخل اسمك الكامل' : 'أدخل اسم الشركة'}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="البريد الإلكتروني"
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="كلمة المرور"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="تأكيد كلمة المرور"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="primary" className="w-full py-2.5">
            {userType === 'student' ? 'إنشاء حساب طالب' : 'إنشاء حساب شركة'}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-100">
          لديك حساب بالفعل؟{' '}
          <a href="/login" className="text-brand-primary font-bold hover:underline">
            تسجيل الدخول
          </a>
        </div>
      </div>
    </div>
  );
}