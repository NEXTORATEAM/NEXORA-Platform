import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-tajawal border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors duration-300" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        {/* حقوق النشر والتطوير */}
        <div className="text-center md:text-right">
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            © 2027 منصة <span className="font-bold text-slate-900 dark:text-white">NEXORA</span> جميع الحقوق محفوظة.
          </p>
        </div>

        {/* روابط الـ Footer التفاعلية */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-brand-primary dark:text-brand-light">
          <Link to="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            سياسة الخصوصية
          </Link>
          <Link to="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            شروط الاستخدام
          </Link>
          <a href="#support" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            الدعم الفني
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;