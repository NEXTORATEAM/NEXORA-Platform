import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Applicants() {
  // حالة تجريبية للمرشحين (يمكن جعلها مصفوفة فارغة [] لاختبار الحالة الفارغة)
  const [applicants, setApplicants] = useState([
    { id: 1, name: 'أحمد محمد', role: 'Frontend Developer', matchScore: '92%', status: 'مقبول مبدئياً' },
    { id: 2, name: 'فاطمة علي', role: 'Data Analyst', matchScore: '85%', status: 'قيد المراجعة' },
  ]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-darker font-tajawal">إدارة المتقدمين والترشيح الذكي</h1>
          <p className="text-sm text-slate-500">مراجعة نتائج المطابقة وتحليل الـ ATS للمرشحين للوظائف النشطة</p>
        </div>
        <Link 
          to="/recruiter/add-job" 
          className="bg-brand-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-brand-light transition shadow-sm"
        >
          + نشر وظيفة جديدة
        </Link>
      </div>

      {/* جدول المرشحين أو الحالة الفارغة */}
      {applicants.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-semibold">اسم المتقدم</th>
                  <th className="p-4 font-semibold">الوظيفة المتقدم لها</th>
                  <th className="p-4 font-semibold">نسبة المطابقة (ATS)</th>
                  <th className="p-4 font-semibold">الحالة</th>
                  <th className="p-4 font-semibold text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applicants.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 font-medium text-slate-800">{app.name}</td>
                    <td className="p-4 text-slate-600">{app.role}</td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">
                        {app.matchScore}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{app.status}</td>
                    <td className="p-4 text-center">
                      <button className="text-brand-primary hover:underline font-medium text-xs">
                        عرض التفاصيل
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* الحالة الفارغة (Empty State) الاحترافية */
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-2xl text-slate-400">
            📂
          </div>
          <h2 className="text-lg font-bold text-slate-700 font-tajawal">لا يوجد متقدمون حتى الآن</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            لم يتم رفع أي سير ذاتية مطابقة للوظائف النشطة حالياً. قم بمشاركة رابط الوظيفة أو رفع ملفات الـ ZIP للبدء بالتحليل.
          </p>
          <Link 
            to="/recruiter/batch-upload" 
            className="inline-block bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-slate-800 transition"
          >
            رفع دفعة سير ذاتية (Batch Upload)
          </Link>
        </div>
      )}
    </div>
  );
}