import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-brand-darker font-tajawal">مرحباً بك مجدداً في NEXORA</h1>
          <p className="text-sm text-slate-500">سجل دخولك لاستكمال رحلتك المهنية وتحليل السير الذاتية</p>
        </div>

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
          <a href="/register" className="text-brand-primary font-bold hover:underline">
            إنشاء حساب جديد
          </a>
        </div>
      </div>
    </div>
  );
}