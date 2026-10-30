import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

export default function Applicants() {
  // مصفوفة فارغة تماماً لحين استقبال البيانات الحقيقية من قاعدة البيانات عبر الـ Backend
  const [applicants, setApplicants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null); // لعرض التقرير التفصيلي من الـ Backend

  /* 
    ===============================================================
    🔗 مكان جلب البيانات الحقيقية من الـ Backend (FastAPI / ATS Pipeline)
    ===============================================================
    عند ربط النظام بقاعدة البيانات، يتم تفعيل جلب البيانات هكذا:

    useEffect(() => {
      fetch('http://localhost:8000/api/recruiter/applicants')
        .then(res => res.json())
        .then(data => setApplicants(data))
        .catch(err => console.error("Error fetching applicants:", err));
    }, []);
  */

  // تصفية المرشحين حسب البحث في حال وجود بيانات حقيقية
  const filteredApplicants = applicants.filter(app => 
    (app.name && app.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (app.role && app.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // وظيفة تصدير البيانات إلى ملف CSV عند توفرها
  const handleExportCSV = () => {
    if (applicants.length === 0) return;
    
    const headers = ['ID,Name,Role,ATS Match,Matched Skills,Missing Skills\n'];
    const rows = applicants.map(app => 
      `"${app.id}","${app.name}","${app.role}","${app.matchScore}%","${app.matchedSkills?.join(' - ')}","${app.missingSkills?.join(' - ')}"`
    );
    
    const csvContent = 'data:text/csv;charset=utf-8,' + headers.concat(rows).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'nexora_applicants_ats.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6 md:p-10 font-tajawal transition-colors duration-300" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-brand-primary animate-pulse"></span>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white font-tajawal">
                جدول الفرز والترتيب الآلي للمتقدمين
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              نتائج معالجة ملف الـ ZIP مرتبة تنازلياً حسب نسبة المطابقة الدلالية (ATS Match Score)
            </p>
          </div>

          <Link to="/recruiter/add-job">
            <Button variant="primary" size="md">
              + نشر وظيفة جديدة
            </Button>
          </Link>
        </div>

        {/* شريط التحكم (بحث وتصدير CSV) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* زر التصدير */}
            <button 
              onClick={handleExportCSV}
              disabled={applicants.length === 0}
              className={`w-full md:w-auto px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition shadow-sm ${
                applicants.length > 0 
                  ? 'bg-brand-darker hover:bg-brand-dark text-white cursor-pointer' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>📊</span> تصدير CSV
            </button>

            {/* حقل البحث */}
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="البحث عن مرشح بالاسم أو المسمى..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={applicants.length === 0}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary transition disabled:opacity-50"
              />
            </div>
          </div>

          {/* هيكل الجدول (يظهر عند وجود بيانات حقيقية من الـ Backend) */}
          {filteredApplicants.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-xs border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4 font-semibold">اسم المتقدم</th>
                    <th className="p-4 font-semibold">نسبة المطابقة الـ ATS</th>
                    <th className="p-4 font-semibold">المهارات المتوفرة</th>
                    <th className="p-4 font-semibold">المهارات الناقصة</th>
                    <th className="p-4 font-semibold text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredApplicants.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                      
                      {/* اسم المتقدم مع الأيقونة */}
                      <td className="p-4 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-light font-bold flex items-center justify-center text-sm border border-brand-primary/20 shrink-0">
                          {app.initials}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{app.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{app.role}</p>
                        </div>
                      </td>

                      {/* نسبة المطابقة */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="bg-brand-darker dark:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-black">
                            {app.matchScore}%
                          </span>
                          <div className="w-24 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden hidden sm:block">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${app.matchScore}%` }}></div>
                          </div>
                        </div>
                      </td>

                      {/* المهارات المتوفرة */}
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1.5">
                          {app.matchedSkills?.map((skill, idx) => (
                            <span key={idx} className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-md text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* المهارات الناقصة */}
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1.5">
                          {app.missingSkills?.map((skill, idx) => (
                            <span key={idx} className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 px-2.5 py-0.5 rounded-md text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* زر التفاصيل */}
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => setSelectedApplicant(app)}
                          className="bg-brand-soft/30 hover:bg-brand-soft text-brand-darker dark:text-white px-4 py-2 rounded-xl text-xs font-bold transition border border-brand-primary/20"
                        >
                          عرض التقرير التفصيلي
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* الحالة الفارغة (Empty State) الاحترافية بانتظار ملفات الـ ZIP من الباك إند */
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-16 text-center space-y-5">
              <div className="w-20 h-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-sm">
                📂
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-tajawal">لا توجد سير ذاتية مفلترة حتى الآن</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  لم يتم رفع أو تحليل أي سير ذاتية (ZIP) للوظائف النشطة بعد. قم بررفع الملف المضغوط ليبدأ الذكاء الاصطناعي بفرز وترتيب المتقدمين وعرضهم هنا تلقائياً.
                </p>
              </div>
              <div className="pt-2">
                <Link to="/recruiter/batch-upload">
                  <Button variant="outline" size="md" className="mx-auto">
                    رفع ملفات السير الذاتية (ZIP)
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
            <span>{filteredApplicants.length} متقدمين</span>
            <span>ترتيب تنازلي حسب المطابقة • بانتظار اتصال الـ Backend</span>
          </div>

        </div>

      </div>

      {/* نافذة التقرير التفصيلي (Modal) لعرض تحليل الـ Backend */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" dir="rtl">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">تقرير التحليل الذكي (ATS)</h3>
                <p className="text-xs text-slate-500">مرشح: {selectedApplicant.name}</p>
              </div>
              <button 
                onClick={() => setSelectedApplicant(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-white flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-brand-primary">التقييم الشامل والملخص:</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{selectedApplicant.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">المهارات المتوفرة:</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{selectedApplicant.matchedSkills?.join(', ')}</p>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-xl">
                  <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-1">المهارات الناقصة:</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{selectedApplicant.missingSkills?.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="primary" size="md" onClick={() => setSelectedApplicant(null)} className="w-full">
                إغلاق التقرير
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}