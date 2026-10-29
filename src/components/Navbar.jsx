import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// استيراد صورة الشعار من مجلد الـ assets
import logoImage from '../assets/logo.png'; 

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  // التحقق من المسارات الحالية
  const isLoginPage = path === '/login';
  const isRegisterPage = path === '/register';
  const isAuthPage = isLoginPage || isRegisterPage;
  const isRecruiterPage = path.startsWith('/recruiter');
  const isCandidatePage = path.startsWith('/candidate');

  return (
    <header className="bg-brand-darker text-white sticky top-0 z-50 shadow-md font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img 
            src={logoImage} 
            alt="NEXORA Logo" 
            className="w-10 h-10 object-contain rounded-xl" 
          />
          <span className="text-xl font-extrabold tracking-wide text-white">
            NEXORA
          </span>
        </Link>

        {/* Dynamic Links (الروابط المتغيرة حسب الصفحة) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-soft">
          
          {/* 1. روابط صفحات المصادقة (الدعم، المساعدة، الإعدادات) */}
          {isAuthPage && (
            <>
              <a href="#support" className="hover:text-white transition-colors">الدعم الفني</a>
              <a href="#help" className="hover:text-white transition-colors">المساعدة</a>
              <a href="#settings" className="hover:text-white transition-colors">الإعدادات</a>
            </>
          )}

          {/* 2. روابط لوحة الشركات (Recruiter) */}
          {isRecruiterPage && (
            <>
              <Link to="/recruiter/add-job" className="hover:text-white transition-colors">نشر وظيفة</Link>
              <Link to="/recruiter/applicants" className="hover:text-white transition-colors">المتقدمين</Link>
              <Link to="/recruiter/market-radar" className="hover:text-white transition-colors">رادار السوق</Link>
            </>
          )}

          {/* 3. روابط لوحة الطالب (Candidate) */}
          {isCandidatePage && (
            <>
              <Link to="/candidate/dashboard" className="hover:text-white transition-colors">لوحة التحكم</Link>
              <Link to="/candidate/upload-cv" className="hover:text-white transition-colors">رفع السيرة الذاتية</Link>
              <Link to="/candidate/skill-gap" className="hover:text-white transition-colors">تحليل الفجوة</Link>
            </>
          )}

        </nav>

        {/* User / Actions */}
        <div className="flex items-center gap-3">
          {isRecruiterPage && (
            <span className="text-xs bg-brand-dark px-3 py-1.5 rounded-full text-brand-soft border border-brand-primary/35">
              لوحة التوظيف (Recruiter)
            </span>
          )}
          {isCandidatePage && (
            <span className="text-xs bg-brand-dark px-3 py-1.5 rounded-full text-brand-soft border border-brand-primary/35">
              لوحة الباحث (Candidate)
            </span>
          )}

          {/* زر إنشاء حساب يظهر حصرياً عندما يكون المستخدم في صفحة تسجيل الدخول */}
          {isLoginPage ? (
            <Link to="/register" className="text-sm font-semibold bg-brand-primary hover:bg-brand-light text-white px-4 py-2 rounded-xl transition-all shadow-sm">
              إنشاء حساب
            </Link>
          ) : !isAuthPage ? (
            <Link to="/login" className="text-sm font-semibold bg-brand-primary hover:bg-brand-light text-white px-4 py-2 rounded-xl transition-all shadow-sm">
              تسجيل الخروج
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Navbar;