import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { registerUser } from '../../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من إدخال الاسم
    if (!formData.name.trim()) {
      setErrorMessage('يرجى إدخال الاسم الكامل');
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
      setLoading(true);

      // حصر التسجيل العام في دور باحث عن عمل (candidate)
      const role = 'candidate';

      // تجهيز البيانات وإرسال name للـ Backend
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: role
      };

      // إرسال طلب إنشاء الحساب
      const response = await registerUser(userData);

      const accessToken = response?.access_token;
      const returnedRole = response?.role;
      const tokenType = response?.token_type || 'bearer';

      if (!accessToken) {
        setErrorMessage('تعذر استلام رمز الدخول من الخادم، يرجى المحاولة مرة أخرى');
        return;
      }

      if (returnedRole !== 'candidate') {
        setErrorMessage('صلاحية الحساب الراجعة غير صالحة للتسجيل العام');
        return;
      }

      localStorage.setItem('token', accessToken);
      localStorage.setItem('tokenType', tokenType);
      localStorage.setItem('userRole', returnedRole);

      // الانتقال إلى لوحة Candidate بعد التحقق وحفظ بيانات الجلسة
      navigate('/candidate/dashboard');

    } catch (error) {
      // معالجة الأخطاء بأمان دون طباعة تفاصيل الطلب أو بيانات المستخدم الحساسة
      let message = error?.response?.data?.detail;
      if (Array.isArray(message)) {
        message = message.map((item) => item?.msg || 'خطأ في المدخلات').join(' - ');
      } else if (typeof message === 'object' && message !== null) {
        message = 'تعذر إكمال إنشاء الحساب، يرجى التحقق من البيانات المدخلة';
      }

      setErrorMessage(
        message || 'حدث خطأ أثناء إنشاء الحساب، حاول مرة أخرى'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 flex items-center justify-center bg-slate-50 flex-grow" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-brand-darker font-tajawal">إنشاء حساب جديد في NEXORA</h1>
          <p className="text-sm text-slate-500">أنشئ حساب باحث عن عمل وابدأ رحلتك الذكية معنا</p>
        </div>

        {/* تنبيه الخطأ في حال وجود مشكلة */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl text-center font-medium">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="الاسم الكامل"
            type="text"
            name="name"
            placeholder="أدخل اسمك الكامل"
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

          <Button type="submit" variant="primary" className="w-full py-2.5" disabled={loading}>
            {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
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