import React from 'react';
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-tajawal" dir="rtl">
      {/* تشغيل نظام المسارات الرئيسي للمشروع */}
      <AppRouter />
    </div>
  );
}