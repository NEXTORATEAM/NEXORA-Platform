
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { registerUser } from '../../services/authService';

export default function Register() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState('student');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // التعامل مع تغيير بيانات الحقول
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  // إنشاء الحساب والاتصال بالـ Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    // التحقق من الحقول
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // التحقق من تطابق كلمتي المرور
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('كلمتا المرور غير متطابقتين');
      return;
    }

    // التحقق من طول كلمة المرور
    if (formData.password.length < 6) {
      setErrorMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    try {
      setErrorMessage('');
      setIsLoading(true);

      // تحويل نوع الحساب إلى القيمة المطلوبة في Backend
      const role = userType === 'student'
        ? 'candidate'
        : 'recruiter';

      // تجهيز البيانات المطلوبة من Backend
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: role
      };

      console.log('Sending registration data:', {
        name: userData.name,
        email: userData.email,
        role: userData.role
      });

      // إرسال طلب إنشاء الحساب
      const response = await registerUser(userData);

      console.log('Registration successful:', response);

      // الانتقال بعد نجاح إنشاء الحساب فقط
      if (userType === 'student') {
        navigate('/candidate/dashboard');
      } else {
        navigate('/recruiter/add-job');
      }

    } catch (error) {
      console.error('Registration error:', error);

      const message = error.response?.data?.detail;

      setErrorMessage(
        Array.isArray(message)
          ? message.map((item) => item.msg).join(', ')
          : message || 'حدث خطأ أثناء إنشاء الحساب، حاول مرة أخرى'
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
            إنشاء حساب جديد في NEXORA
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            اختر نوع الحساب وابدأ رحلتك الذكية معنا
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs p-3 rounded-xl text-center font-medium">
            {errorMessage}
          </div>
        )}

        {/* Role Selection */}
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

        {/* Registration Form */}
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

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            className="w-full py-2.5"
          >
            {isLoading
              ? 'جارٍ إنشاء الحساب...'
              : userType === 'student'
                ? 'إنشاء حساب'
                : 'إنشاء حساب شركة'}
          </Button>

        </form>

        {/* Login Link */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">

          لديك حساب بالفعل؟{' '}

          <Link
            to="/login"
            className="text-brand-primary dark:text-brand-light font-bold hover:underline"
          >
            تسجيل الدخول
          </Link>

        </div>

      </div>
    </div>
  );
}

