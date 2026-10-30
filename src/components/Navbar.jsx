import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../assets/logo.png'; 

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  };

  const isLoginPage = path === '/login';
  const isRegisterPage = path === '/register';
  const isAuthPage = isLoginPage || isRegisterPage;
  const isRecruiterPage = path.startsWith('/recruiter');
  const isCandidatePage = path.startsWith('/candidate');

  return (
    <header className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white sticky top-0 z-50 shadow-sm border-b border-slate-200 dark:border-slate-800 font-tajawal transition-colors duration-300" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img src={logoImage} alt="NEXORA Logo" className="w-10 h-10 object-contain rounded-xl" />
          <span className="text-xl font-extrabold tracking-wide text-brand-darker dark:text-white">
            NEXORA
          </span>
        </Link>

        {/* Dynamic Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          {isAuthPage && (
            <>
              <a href="#support" className="hover:text-brand-primary transition-colors">الدعم الفني</a>
              <a href="#help" className="hover:text-brand-primary transition-colors">المساعدة</a>
            </>
          )}

          {isRecruiterPage && (
            <>
              <Link to="/recruiter/add-job" className="hover:text-brand-primary transition-colors">نشر وظيفة</Link>
              <Link to="/recruiter/batch-upload" className="hover:text-brand-primary transition-colors">رفع السير الذاتية</Link>
              <Link to="/recruiter/applicants" className="hover:text-brand-primary transition-colors">المتقدمين</Link>
              <Link to="/recruiter/market-radar" className="hover:text-brand-primary transition-colors">تحليلات السوق</Link>
            </>
          )}

          {isCandidatePage && (
            <>
              <Link to="/candidate/dashboard" className="hover:text-brand-primary transition-colors">لوحة التحكم</Link>
              <Link to="/candidate/upload-cv" className="hover:text-brand-primary transition-colors">رفع السيرة الذاتية</Link>
              <Link to="/candidate/skill-gap" className="hover:text-brand-primary transition-colors">تحليل الفجوة</Link>
            </>
          )}
        </nav>

        {/* Actions & Theme Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition shadow-sm"
            title="تبديل الوضع الليلي والنهاري"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {isLoginPage ? (
            <Link to="/register" className="text-sm font-semibold bg-brand-primary hover:bg-brand-dark text-white px-4 py-2 rounded-xl transition-all shadow-sm">
              إنشاء حساب
            </Link>
          ) : !isAuthPage ? (
            <Link to="/login" className="text-sm font-semibold bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl transition-all shadow-sm">
              تسجيل الخروج
            </Link>
          ) : null}
        </div>

      </div>
    </header>
  );
};

export default Navbar;