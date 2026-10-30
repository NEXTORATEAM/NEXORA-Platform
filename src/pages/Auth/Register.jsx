import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student'); // 'student' or 'recruiter'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  // دالة التعامل مع التسجيل والربط مع قاعدة البيانات
  const handleRegisterClick = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage('يرجى ملء كافة الحقول المطلوبة.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('كلمتا المرور غير متطابقتان. يرجى التحقق مرة أخرى.');
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
        const response = await fetch('http://localhost:8000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: formData.name,
            email: formData.email,
            password: formData.password,
            role: userType // 'student' or 'recruiter'
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'حدث خطأ أثناء إنشاء الحساب');
        }

        // حفظ الـ Token والبيانات في localStorage عند نجاح التسجيل
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', userType);

        // التوجيه الفوري المباشر حسب نوع المستخدم
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
    */

    // مؤقتاً لحين ربط الـ Backend: محاكاة التسجيل والتوجيه
    setTimeout(() => {
      setIsLoading(false);
      if (userType === 'recruiter') {
        navigate('/recruiter/add-job');
      } else {
        navigate('/candidate/dashboard');
      }
    }, 1000);
  };

  return (
    <div className="py-12 px-4 flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex-grow font-tajawal transition-colors duration-300" dir="rtl">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 space-y-6 transition-colors duration-300">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-tajawal">إنشاء حساب جديد في NEXORA</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">اختر نوع الحساب وابدأ رحلتك الذكية معنا</p>
        </div>

        {/* تنبيه الخطأ */}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs p-3 rounded-xl text-center font-medium">
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