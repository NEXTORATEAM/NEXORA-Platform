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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  // دالة التعامل مع التسجيل والتوجيه المباشر
  const handleRegisterClick = (e) => {
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
    console.log('Registering as:', userType);

    // التوجيه الفوري المباشر حسب نوع المستخدم
    if (userType === 'recruiter') {
      navigate('/recruiter/add-job');
    } else {
      navigate('/candidate/dashboard');
    }
  };

  return (
    <div className="py-12 px-4 flex items-center justify-center bg-slate-50 flex-grow" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-brand-darker font-tajawal">إنشاء حساب جديد في NEXORA</h1>
          <p className="text-sm text-slate-500">اختر نوع الحساب وابدأ رحلتك الذكية معنا</p>
        </div>

        {/* تنبيه الخطأ */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl text-center font-medium">
            {errorMessage}
          </div>
        )}

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
            باحث عن عمل  
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

          <Button type="submit" variant="primary" className="w-full py-2.5">
            {userType === 'student' ? 'إنشاء حساب' : 'إنشاء حساب شركة'}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-100">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="text-brand-primary font-bold hover:underline">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}