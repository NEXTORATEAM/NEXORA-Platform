import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-darker text-brand-soft font-tajawal border-t border-brand-dark mt-auto" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        {/* حقوق النشر والتطوير */}
        <div className="text-center md:text-right">
          <p className="text-xs md:text-sm text-slate-300">
            © 2027 منصة <span className="font-bold text-white">NEXORA</span> - جميع الحقوق محفوظة.
          </p>
        </div>

        {/* روابط الـ Footer التفاعلية */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-brand-light">
          <Link to="/privacy" className="hover:text-white transition-colors">
            سياسة الخصوصية
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors">
            شروط الاستخدام
          </Link>
          <a href="#support" className="hover:text-white transition-colors">
            الدعم الفني
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;