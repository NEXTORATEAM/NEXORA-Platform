import React from 'react';

export default function MarketRadar() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-brand-darker font-tajawal">رادار السوق (Market Radar)</h1>
        <p className="text-sm text-slate-500">تحليل حي لاتجاهات التوظيف وأبرز المهارات الأكثر طلباً في السوق المحلي</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-2">
          <h3 className="text-sm text-slate-500 font-medium">المهارات الأكثر طلباً</h3>
          <p className="text-xl font-bold text-brand-primary">React & FastAPI</p>
          <span className="text-xs text-green-600 font-medium">بزيادة 15% هذا الشهر</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-2">
          <h3 className="text-sm text-slate-500 font-medium">إجمالي الوظائف النشطة</h3>
          <p className="text-3xl font-extrabold text-brand-darker">24 وظيفة</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-2">
          <h3 className="text-sm text-slate-500 font-medium">معدل مطابقة الـ ATS العام</h3>
          <p className="text-3xl font-extrabold text-green-600">78.4%</p>
        </div>
      </div>
    </div>
  );
}