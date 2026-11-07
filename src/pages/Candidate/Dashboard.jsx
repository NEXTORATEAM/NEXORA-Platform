import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Gauge, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const [cvName, setCvName] = useState('');
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    setCvName(localStorage.getItem('candidateCvName') || '');
    const saved = localStorage.getItem('candidateAnalysis');
    if (saved) {
      try {
        setAnalysis(JSON.parse(saved));
      } catch {
        setAnalysis(null);
      }
    }
  }, []);

  const score = analysis?.atsScore;
  const skills = Array.isArray(analysis?.skills) ? analysis.skills : [];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-6 font-tajawal text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-10">
      <main className="mx-auto max-w-7xl space-y-8">
        <header className="border-b border-slate-200 pb-6 dark:border-slate-800">
          <h1 className="text-3xl font-black">لوحة نتائج التحليل</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            ملخص السيرة الذاتية ومؤشر التوافق والمهارات.
          </p>
        </header>

        {!cvName ? (
          <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
            <FileText className="mx-auto text-brand-primary" size={36} />
            <h2 className="mt-4 text-xl font-black">لا توجد سيرة ذاتية مرفوعة</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">ارفع السيرة لبدء التحليل.</p>
            <Link to="/candidate/upload-cv" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-darker px-5 py-3 font-bold text-white">
              رفع السيرة الذاتية <ArrowLeft size={17} />
            </Link>
          </section>
        ) : (
          <>
            <section className="grid gap-5 md:grid-cols-3">
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <FileText className="text-brand-primary" />
                <h2 className="mt-4 font-bold">الملف</h2>
                <p className="mt-2 break-all text-sm text-slate-500 dark:text-slate-400">{cvName}</p>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <Gauge className="text-brand-primary" />
                <h2 className="mt-4 font-bold">مؤشر ATS</h2>
                {Number.isFinite(score) ? (
                  <p className="mt-2 text-3xl font-black text-brand-primary">{score}%</p>
                ) : (
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">بانتظار نتيجة التحليل.</p>
                )}
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <Sparkles className="text-brand-primary" />
                <h2 className="mt-4 font-bold">المهارات المكتشفة</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {skills.length ? `${skills.length} مهارة` : 'بانتظار نتيجة التحليل.'}
                </p>
              </article>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-black">مؤشر توافق المهارات</h2>
              {Number.isFinite(score) ? (
                <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full rounded-full bg-brand-primary" style={{ width: `${Math.max(0, Math.min(score, 100))}%` }} />
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  سيظهر المؤشر بعد مقارنة السيرة بمتطلبات وظيفة محددة.
                </p>
              )}
            </section>

            <section className="flex flex-wrap gap-3">
              <Link to="/candidate/skill-gap" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold dark:border-slate-700">
                عرض تحليل الفجوة
              </Link>
              <Link to="/candidate/ai-outputs" className="rounded-xl bg-brand-darker px-5 py-3 text-sm font-bold text-white">
                خطاب التقديم
              </Link>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
