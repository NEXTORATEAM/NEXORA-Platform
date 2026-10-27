import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-brand-darker text-white sticky top-0 z-50 shadow-md font-cairo">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-soft flex items-center justify-center font-bold text-brand-darker text-xl shadow-inner">
            N
          </div>
          <span className="text-xl font-extrabold tracking-wide text-white">
            NEXORA
          </span>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-soft">
          <a href="#" className="hover:text-white transition-colors">الرئيسية</a>
          <a href="#" className="hover:text-white transition-colors">الوظائف</a>
          <a href="#" className="hover:text-white transition-colors">عن المنصة</a>
        </nav>

        {/* User / Actions */}
        <div className="flex items-center gap-3">
          <span className="text-xs bg-brand-dark px-3 py-1.5 rounded-full text-brand-soft border border-brand-primary/30">
            لوحة التوظيف (Recruiter)
          </span>
          <button className="text-sm font-semibold bg-brand-primary hover:bg-brand-light text-white px-4 py-2 rounded-xl transition-all shadow-sm">
            تسجيل الدخول
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;