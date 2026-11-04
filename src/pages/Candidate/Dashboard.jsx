import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, Target, ArrowLeft, BriefcaseBusiness } from 'lucide-react';
import Button from '../../components/Button';

export default function Dashboard() {
  const [cvName, setCvName] = useState('');

  useEffect(() => {
    setCvName(localStorage.getItem('candidateCvName') || '');
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-6 font-tajawal text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-10">
      <main className="mx-auto max-w-7xl space-y-8">
        <header className="border-b border-slate-200 pb-6 dark:border-slate-800">
          <p className="text-sm font-bold text-brand-primary">بوابة المرشحين</p>
          <h1 className="mt-2 text-3xl font-black">لوحة التحكم</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            متابعة السيرة الذاتية والمهارات والتوصيات المهنية.
          </p>
        </header>

        <section className="rounded-3xl bg-brand-darker p-7 text-white shadow-sm md:p-9">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm">
            <Sparkles size={16} /> مساحة المرشحين
          </span>
          <h2 className="mt-4 text-2xl font-black">الملف المهني في مكان واحد</h2>
          <p className="mt-3 max-w-2xl leading-7 text-blue-100">
            أضف السيرة الذاتية لمتابعة ملفك واستكشاف المهارات التي يمكن تطويرها.
          </p>
          <Link to="/candidate/upload-cv" className="mt-6 inline-block">
            <Button variant="accent">
              <FileText size={18} /> رفع السيرة الذاتية
            </Button>
          </Link>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <FileText className="text-brand-primary" size={24} />
            <h2 className="mt-4 font-bold">السيرة الذاتية</h2>
            <p className="mt-2 break-all text-sm text-slate-500 dark:text-slate-400">
              {cvName || 'لم يتم اختيار ملف بعد'}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Sparkles className="text-brand-primary" size={24} />
            <h2 className="mt-4 font-bold">تحليل المهارات</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {cvName ? 'الملف محفوظ محليًا، والتحليل يحتاج ربط الخادم.' : 'أضف السيرة الذاتية للبدء.'}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Target className="text-brand-primary" size={24} />
            <h2 className="mt-4 font-bold">الفجوات والتوصيات</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              ستظهر النتائج بعد ربط التحليل بالـBackend.
            </p>
          </article>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <BriefcaseBusiness className="text-brand-primary" />
            <h2 className="text-lg font-black">الأقسام</h2>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/candidate/upload-cv" className="rounded-xl bg-brand-darker px-4 py-3 text-sm font-bold text-white">
              رفع السيرة الذاتية
            </Link>
            <Link to="/candidate/skill-gap" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold dark:border-slate-700">
              تحليل الفجوة <ArrowLeft size={16} />
            </Link>
            <Link to="/candidate/ai-outputs" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold dark:border-slate-700">
              التوصيات المهنية <ArrowLeft size={16} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
