import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    /* 
      ===============================================================
      🔗 مكان الربط مع الـ Backend (FastAPI / PostgreSQL or MySQL)
      ===============================================================
      عند الاجتماع والبدء بالربط، يتم إلغاء التعليق عن الكود التالي:

      try {
        const response = await fetch('http://localhost:8000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'بيانات الدخول غير صحيحة.');
        }

        // حفظ رمز التحقق (JWT Token) ونوع المستخدم في LocalStorage
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('userRole', data.role); // 'recruiter' أو 'candidate'

        // التوجيه التلقائي حسب دور المستخدم القادم من الـ Backend
        if (data.role === 'recruiter') {
          navigate('/recruiter/add-job');
        } else {
          navigate('/candidate/dashboard');
        }

      } catch (err) {
        setErrorMessage(err.message || 'حدث خطأ في الاتصال بالسيرفر.');
      } finally {
        setIsLoading(false);
      }
    */

    // مؤقتاً لحين ربط الـ Backend: محاكاة عملية تسجيل الدخول
    setTimeout(() => {
      setIsLoading(false);
      // الافتراضي التوجيه لصفحة لوحة التوظيف للشركات
      navigate('/recruiter/add-job');
    }, 1000);
  };

  return (
    <div className="py-12 px-4 flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex-grow font-tajawal transition-colors duration-300" dir="rtl">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 space-y-6 transition-colors duration-300">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-tajawal">مرحباً بك مجدداً في NEXORA</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">سجل دخولك لاستكمال رحلتك المهنية وتحليل السير الذاتية</p>
        </div>

        {/* عرض رسالة الخطأ إن وجدت */}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs p-3 rounded-xl text-center font-medium">
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
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            required
          />

          <Input
            label="كلمة المرور"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            required
          />

          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input 
                type="checkbox" 
                className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-brand-primary focus:ring-brand-primary" 
              />
              تذكرني
            </label>
            <a href="#forgot-password" className="text-brand-primary dark:text-brand-light hover:underline font-medium text-xs">
              نسيت كلمة المرور؟
            </a>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            size="md" 
            isLoading={isLoading} 
            className="w-full py-2.5 mt-2"
          >
            تسجيل الدخول
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
          ليس لديك حساب بعد؟{' '}
          <Link to="/register" className="text-brand-primary dark:text-brand-light font-bold hover:underline">
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
}