import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Register() {
  const navigate = useNavigate();
  
  // حالات النموذج (Form States)
  const [userType, setUserType] = useState('student'); // 'student' أو 'recruiter'
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // تحديث القيم عند الكتابة
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // دالة إرسال البيانات للـ Backend (الربط مع FastAPI)
  const handleRegisterClick = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // التحقق من تطابق كلمات المرور
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('كلمتا المرور غير متطابقتين');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://10.207.192.164:8000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,       // الاسم المدخل
          email: formData.email,     // البريد الإلكتروني
          password: formData.password, // كلمة المرور
          role: userType             // نوع المستخدم ('student' أو 'recruiter')
        }),
      });

      const data = await response.json();
      
      // طباعة الرد في الـ Console لنتمكن من رؤية محتواه بدقة
      console.log("Response Data:", data);

      if (!response.ok) {
        const errorMsg = typeof data.detail === 'string' ? data.detail : 'حدث خطأ أثناء إنشاء الحساب';
        throw new Error(errorMsg);
      }

      // حفظ الـ Token أو بيانات المستخدم إذا أرجعه الباك إند مباشرة
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
      }
      localStorage.setItem('userRole', userType);

      // التوجيه الفوري حسب نوع المستخدم
      if (userType === 'recruiter') {
        navigate('/recruiter/add-job');
      } else {
        navigate('/candidate/dashboard');
      }

    } catch (err) {
      setErrorMessage(err.message || 'فشل الاتصال بالسيرفر، يرجى المحاولة لاحقاً.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 space-y-6">
        
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">إنشاء حساب جديد في NEXORA</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">اختر نوع الحساب وادخل بياناتك للبدء</p>
        </div>

        {/* عرض رسالة الخطأ إن وجدت */}
        {errorMessage && (
          <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
          <button
            type="button"
            onClick={() => setUserType('student')}
            className={`py-2 text-sm font-medium rounded-lg transition-all ${
              userType === 'student'
                ? 'bg-white dark:bg-slate-900 text-brand-darker dark:text-white shadow-xs font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            باحث عن عمل  
          </button>
          <button
            type="button"
            onClick={() => setUserType('recruiter')}
            className={`py-2 text-sm font-medium rounded-lg transition-all ${
              userType === 'recruiter'
                ? 'bg-white dark:bg-slate-900 text-brand-darker dark:text-white shadow-xs font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            شركة / مسؤول توظيف
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleRegisterClick} className="space-y-4">
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

          <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="w-full py-2.5">
            {userType === 'student' ? 'إنشاء حساب' : 'إنشاء حساب شركة'}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="text-brand-primary dark:text-brand-light font-bold hover:underline">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}