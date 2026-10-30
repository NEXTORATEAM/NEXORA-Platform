import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. استيراد useNavigate
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login() {
  const navigate = useNavigate(); // 2. تفعيل التوجيه
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }

    setErrorMessage('');
    console.log('Login submitted:', { email, password });

    // 3. الانتقال تلقائياً بعد تسجيل الدخول (مثلاً إلى صفحة نشر الوظيفة للشركات)
    navigate('/recruiter/add-job');
  };

  // ... باقي كود الصفحة ...

  return (
    <div className="py-12 px-4 flex items-center justify-center bg-slate-50 flex-grow" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-brand-darker font-tajawal">مرحباً بك مجدداً في NEXORA</h1>
          <p className="text-sm text-slate-500">سجل دخولك لاستكمال رحلتك المهنية وتحليل السير الذاتية</p>
        </div>

        {/* عرض رسالة الخطأ إن وجدت */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl text-center font-medium">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="البريد الإلكتروني"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="كلمة المرور"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input type="checkbox" className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary" />
              تذكرني
            </label>
            <a href="#" className="text-brand-primary hover:underline font-medium">نسيت كلمة المرور؟</a>
          </div>

          <Button type="submit" variant="primary" className="w-full py-2.5">
            تسجيل الدخول
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-100">
          ليس لديك حساب بعد؟{' '}
          <Link to="/register" className="text-brand-primary font-bold hover:underline">
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
}