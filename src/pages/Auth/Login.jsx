import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { loginUser } from '../../services/authService';

// استخراج بيانات المستخدم من JWT
const getUserRole = (token) => {
  try {
    const payload = token.split('.')[1];

    const base64 = payload
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const decoded = atob(base64);

    const userData = JSON.parse(decoded);

    return userData.role;
  } catch (error) {
    return null;
  }
};

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      // إرسال بيانات الدخول إلى Backend
      const response = await loginUser({
        email,
        password,
      });

      const token = response.access_token;

      if (!token) {
        throw new Error('لم يتم استلام رمز الدخول');
      }

      // استخراج دور المستخدم
      const role = getUserRole(token);

      if (role !== 'candidate' && role !== 'recruiter') {
        throw new Error('دور المستخدم غير معروف');
      }

      // حفظ بيانات تسجيل الدخول
      localStorage.setItem('token', token);
      localStorage.setItem('tokenType', response.token_type);
      localStorage.setItem('userRole', role);

      // توجيه المستخدم حسب دوره
      if (role === 'candidate') {
        navigate('/candidate/dashboard');
      } else {
        navigate('/recruiter/add-job');
      }

    } catch (error) {
      console.error('Login error:', error);

      if (error.response?.status === 401) {
        setErrorMessage('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
      } else {
        setErrorMessage(
          error.response?.data?.detail ||
          error.message ||
          'حدث خطأ أثناء تسجيل الدخول.'
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 flex items-center justify-center bg-slate-50 flex-grow" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-brand-darker font-tajawal">
            مرحباً بك مجدداً في NEXORA
          </h1>

          <p className="text-sm text-slate-500">
            سجل دخولك لاستكمال رحلتك المهنية وتحليل السير الذاتية
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl text-center font-medium">
            {errorMessage}
          </div>
        )}

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
              <input
                type="checkbox"
                className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
              />
              تذكرني
            </label>

            <a
              href="#"
              className="text-brand-primary hover:underline font-medium"
            >
              نسيت كلمة المرور؟
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-2.5"
            disabled={loading}
          >
            {loading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
          </Button>

        </form>

        <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-100">
          ليس لديك حساب بعد؟{' '}
          <Link
            to="/register"
            className="text-brand-primary font-bold hover:underline"
          >
            إنشاء حساب جديد
          </Link>
        </div>

      </div>
    </div>
  );
}