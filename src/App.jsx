import React, { useState } from 'react';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

export default function App() {
  // حالة بسيطة للتبديل بين الصفحات للتجربة قبل إعداد الـ React Router
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div className="min-h-screen bg-slate-100">
      {/* شريط علوي مؤقت لمعاينة وتجربة الصفحات */}
      <div className="bg-brand-darker text-white p-3 flex justify-center items-center gap-4 text-sm font-tajawal shadow-md">
        <span>أنتِ الآن في طور المعاينة:</span>
        <button
          onClick={() => setCurrentPage('login')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            currentPage === 'login'
              ? 'bg-brand-primary text-white font-bold'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          صفحة تسجيل الدخول (Login)
        </button>
        <button
          onClick={() => setCurrentPage('register')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            currentPage === 'register'
              ? 'bg-brand-primary text-white font-bold'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          صفحة إنشاء حساب (Register)
        </button>
      </div>

      {/* عرض الصفحة المختارة */}
      <main>
        {currentPage === 'login' ? <Login /> : <Register />}
      </main>
    </div>
  );
}