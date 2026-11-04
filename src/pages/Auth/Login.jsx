
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { loginUser } from '../../services/authService';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    if (!email.trim() || !password) {
      setErrorMessage('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }

    try {
      setErrorMessage('');
      setIsLoading(true);

      // الاتصال بالـ Backend
      const data = await loginUser(email.trim(), password);

      // التأكد من استلام رمز الدخول ونوع الحساب
      if (!data.access_token || !data.role) {
        throw new Error('لم يتم استلام بيانات تسجيل الدخول كاملة.');
      }

      // حفظ بيانات تسجيل الدخول
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('tokenType', data.token_type);
      localStorage.setItem('userRole', data.role);

      console.log('Login successful:', {
        role: data.role,
        tokenReceived: true
      });

      // التوجيه حسب نوع الحساب
      if (data.role === 'recruiter') {
        navigate('/recruiter/add-job');
      } else if (data.role === 'candidate') {
        navigate('/candidate/dashboard');
      } else {
        setErrorMessage('نوع الحساب غير معروف.');
      }

    } catch (error) {
      console.error('Login error:', error);

      const message = error.response?.data?.detail;

      setErrorMessage(
        message || error.message || 'حدث خطأ أثناء تسجيل الدخول.'
      );

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="py-12 px-4 flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex-grow font-tajawal transition-colors duration-300"
      dir="rtl"
    >
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 space-y-6 transition-colors duration-300">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-tajawal">
            مرحباً بك مجدداً في NEXORA
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            سجل دخولك لاستكمال رحلتك المهنية وتحليل السير الذاتية
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs p-3 rounded-xl text-center font-medium">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
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

            <a
              href="#forgot-password"
              className="text-brand-primary dark:text-brand-light hover:underline font-medium text-xs"
            >
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
            {isLoading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
          </Button>

        </form>

        {/* Footer Link */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">

          ليس لديك حساب بعد؟{' '}

          <Link
            to="/register"
            className="text-brand-primary dark:text-brand-light font-bold hover:underline"
          >
            إنشاء حساب جديد
          </Link>

        </div>

      </div>
    </div>
  );
}

