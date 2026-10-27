import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-darker text-brand-soft font-tajawal border-t border-brand-dark mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div>
          <p>© 2026 مشروع NEXORA - جميع الحقوق محفوظة.</p>
        </div>
        <div className="flex items-center gap-6 text-xs text-brand-light">
          <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
          <a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a>
          <a href="#" className="hover:text-white transition-colors">الدعم الفني</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;