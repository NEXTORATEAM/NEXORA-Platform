import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpenCheck, BriefcaseBusiness, Lightbulb, Sparkles } from 'lucide-react';

const recommendations = [
  {
    icon: BookOpenCheck,
    title: 'توصيات التعلم',
    text: 'ستظهر هنا موارد أو مجالات تعلم مرتبطة بنتائج تحليل المهارات.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'المسارات المهنية',
    text: 'ستظهر هنا المسارات المهنية المقترحة عند توفر بيانات التحليل.',
  },
  {
    icon: Lightbulb,
    title: 'خطوات مقترحة',
    text: 'ستظهر اقتراحات عملية تساعد على تطوير الملف المهني.',
  },
];

export default function AIOutputs() {
  const cvName = localStorage.getItem('candidateCvName');

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-6 font-tajawal text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-10">
      <main className="mx-auto max-w-7xl space-y-8">
        <header className="border-b border-slate-200 pb-6 dark:border-slate-800">
          <p className="text-sm font-bold text-brand-primary">بوابة المرشحين</p>
          <h1 className="mt-2 text-3xl font-black">التوصيات المهنية</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            أفكار للتعلم والتطوير والمسارات المهنية بناءً على تحليل الملف.
          </p>
        </header>

        <section className="rounded-3xl bg-brand-darker p-7 text-white shadow-sm md:p-9">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm">
            <Sparkles size={16} /> توصيات مهنية
          </span>
          <h2 className="mt-4 text-2xl font-black">
            {cvName ? 'الملف جاهز، والتوصيات بانتظار التحليل' : 'ابدأ برفع السيرة الذاتية'}
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-blue-100">
            {cvName
              ? 'التوصيات الفعلية ستظهر بعد ربط تحليل المهارات وخدمة التوصيات.'
              : 'رفع السيرة الذاتية هو الخطوة الأولى لإعداد توصيات مناسبة للمهارات والخبرات.'}
          </p>
          {!cvName && (
            <Link to="/candidate/upload-cv" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-brand-darker hover:bg-blue-50">
              رفع السيرة الذاتية <ArrowLeft size={17} />
            </Link>
          )}
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {recommendations.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <Icon size={21} />
              </span>
              <h2 className="mt-4 font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{text}</p>
              <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-400 dark:border-slate-800">
                لا توجد توصيات فعلية بعد
              </p>
            </article>
          ))}
        </section>

        <p className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          التوصيات إرشادية، وتعتمد دقتها على اكتمال بيانات السيرة الذاتية ونتائج التحليل.
        </p>
      </main>
    </div>
  );
}
