import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid 
} from 'recharts';

export default function MarketRadar() {
  // حالة البيانات فارغة ومخصصة للربط الحي مع قاعدة البيانات (Backend)
  const [marketStats, setMarketStats] = useState({
    totalJobs: 0,
    jobsGrowth: '0%',
    avgAtsMatch: 0,
    atsGrowth: '0%',
    topRole: 'قيد التحميل...',
    activeCompanies: 0,
    monthlyTrends: [],
    topSkills: []
  });

  /* 
    ملاحظة: هذا المكان المخصص لجلب البيانات الحقيقية من قاعدة البيانات عبر FastAPI
    عندما يجهزه فريق الـ Backend، سيتم تفعيل الـ fetch هنا مباشرة:
    
    useEffect(() => {
      fetch('http://localhost:8000/api/market-radar')
        .then(res => res.json())
        .then(data => setMarketStats(data))
        .catch(err => console.error("Error loading market data:", err));
    }, []);
  */

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6 md:p-10 font-tajawal transition-colors duration-300" dir="rtl">
      
      {/* الهيدر الرئيسي */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-amber-500 animate-pulse"></span>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white font-tajawal">
                تحليلات السوق واتجاهات التوظيف
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              مؤشرات الذكاء الاصطناعي وربط البيانات الحية (في انتظار اتصال الـ Backend)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-300">
              الحالة: جاهز للربط
            </span>
          </div>
        </div>

        {/* بطاقات الإحصائيات (KPI Cards) - فارغة وجاهزة لاستقبال الأرقام */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700/60 p-5 rounded-2xl space-y-3 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">إجمالي الوظائف المتاحة</p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{marketStats.totalJobs}</h3>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-lg">
                {marketStats.jobsGrowth}
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">من قاعدة البيانات مباشرة</p>
          </div>

          <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700/60 p-5 rounded-2xl space-y-3 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500"></div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">متوسط مطابقة ATS</p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{marketStats.avgAtsMatch}%</h3>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-lg">
                {marketStats.atsGrowth}
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">بناءً على السير المرفوعة</p>
          </div>

          <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700/60 p-5 rounded-2xl space-y-3 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500"></div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">المسمى الأكثر طلباً</p>
            <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-300 truncate">{marketStats.topRole}</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">تحديث تلقائي من النظام</p>
          </div>

          <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700/60 p-5 rounded-2xl space-y-3 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-2 h-full bg-amber-500"></div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">الشركات المشاركة</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">{marketStats.activeCompanies}</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">مسجلة في النظام</p>
          </div>

        </div>

        {/* قسم الرسومات البيانية (هيكل جاهز يستقبل المصفوفات الحية) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">نمو الفرص وسوق العمل</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">مخطط تفاعلي بانتظار بيانات الباك إند</p>
            </div>

            <div className="h-72 w-full flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
              {marketStats.monthlyTrends.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={marketStats.monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                    <Area type="monotone" dataKey="jobs" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">لا توجد بيانات متاحة حالياً (في انتظار ربط الـ API)</p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">أعلى المهارات المطلوبة</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">توزيع الطلب حسب التقنيات</p>
            </div>

            <div className="h-72 w-full flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
              {marketStats.topSkills.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketStats.topSkills}>
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Bar dataKey="demand" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">بانتظار بيانات المهارات من السيرفر</p>
              )}
            </div>
          </div>

        </div>

        {/* الجدول التفصيلي (فارغ ومنظم بانتظار البيانات الحقيقية) */}
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">تفاصيل اتجاهات التكنولوجيا والمهارات</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm text-slate-700 dark:text-slate-300">
              <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-900/60 rounded-xl">
                <tr>
                  <th className="p-3 rounded-r-xl">المهارة / التقنية</th>
                  <th className="p-3">التصنيف</th>
                  <th className="p-3">مؤشر الطلب</th>
                  <th className="p-3 rounded-l-xl">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {marketStats.topSkills.length > 0 ? (
                  marketStats.topSkills.map((skill, index) => (
                    <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">{skill.name}</td>
                      <td className="p-3 text-slate-500 dark:text-slate-400">{skill.category}</td>
                      <td className="p-3">{skill.demand}%</td>
                      <td className="p-3">{skill.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-slate-400 dark:text-slate-500 font-medium">
                      لا توجد بيانات معروضة حالياً — بانتظار ربط قاعدة البيانات 
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}