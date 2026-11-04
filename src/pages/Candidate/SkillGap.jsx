import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CircleHelp, Lightbulb, Sparkles, Target } from 'lucide-react';

const sections = [
  {
    icon: Target,
    title: 'المهارات المتوفرة',
    text: 'ستظهر المهارات المستخرجة من السيرة الذاتية بعد ربط التحليل.',
  },
  {
    icon: CircleHelp,
    title: 'المهارات المطلوب تطويرها',
    text: 'ستعرض هذه المساحة الفجوات مقارنة بمتطلبات الوظائف.',
  },
  {
    icon: Lightbulb,
    title: 'خطوات التطوير',
    text: 'ستظهر اقتراحات التطوير المناسبة بعد توفر نتائج التحليل.',
  },
];

export default function SkillGap() {
  const cvName = localStorage.getItem('candidateCvName');

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-6 font-tajawal text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-10">
      <main className="mx-auto max-w-7xl space-y-8">
        <header className="border-b border-slate-200 pb-6 dark:border-slate-800">
          <p className="text-sm font-bold text-brand-primary">بوابة المرشحين</p>
          <h1 className="mt-2 text-3xl font-black">تحليل الفجوة</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            مراجعة المهارات ومجالات التطوير المقترحة.
          </p>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-12">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
            <Sparkles size={27} />
          </span>
          <h2 className="mt-5 text-xl font-black">
            {cvName ? 'السيرة الذاتية محفوظة، والتحليل بانتظار ربط الخادم' : 'لا توجد سيرة ذاتية بعد'}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
            {cvName
              ? `الملف المختار: ${cvName}. ستظهر نتائج المهارات والفجوات بعد توصيل واجهة التحليل.`
              : 'اختر سيرة ذاتية أولًا. بعد ربط التحليل ستظهر المهارات ومجالات التطوير هنا.'}
          </p>
          <Link to="/candidate/upload-cv" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-darker px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark">
            {cvName ? 'اختيار ملف آخر' : 'رفع السيرة الذاتية'}
            <ArrowLeft size={17} />
          </Link>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {sections.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <Icon size={21} />
              </span>
              <h2 className="mt-4 font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{text}</p>
              <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-400 dark:border-slate-800">
                بانتظار بيانات التحليل
              </p>
            </article>
          ))}
        </section>

        <p className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          تنويه: نتائج المطابقة أدوات مساعدة لفهم مدى توافق المهارات، وليست ضمانًا للحصول على وظيفة.
        </p>
      </main>
    </div>
  );
}
