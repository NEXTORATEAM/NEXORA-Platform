import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BriefcaseBusiness,
  FileText,
  Sparkles,
  Target,
  UserRound,
} from 'lucide-react';
import Button from '../../components/Button';

export default function LandingPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 font-tajawal text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100"
    >
      <main className="mx-auto max-w-7xl space-y-10 px-5 py-10 md:px-10 md:py-14">
        {/* مقدمة البوابة */}
        <section className="relative overflow-hidden rounded-3xl bg-brand-darker p-7 text-white shadow-lg md:p-12">
          <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-28 right-1/3 h-72 w-72 rounded-full bg-brand-primary/20" />

          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              <Sparkles size={17} />
              بوابة المرشحين في NEXORA
            </span>

            <h1 className="mt-6 text-3xl font-black leading-tight md:text-5xl">
              خطوة جديدة نحو فرصة تناسب المهارات
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
              ارفع السيرة الذاتية، وتعرّف على المهارات، واكتشف مجالات التطوير
              والتوصيات المهنية. كل ما تحتاج إليه لبدء رحلتك المهنية في مكان واحد.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/candidate/upload-cv">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  <FileText size={19} />
                  رفع السيرة الذاتية
                  <ArrowLeft size={18} />
                </Button>
              </Link>

              <Link
                to="/candidate/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-center font-bold text-white transition hover:bg-white/10"
              >
                لوحة التحكم
              </Link>
            </div>
          </div>
        </section>

        {/* خطوات استخدام البوابة */}
        <section>
          <div className="mb-6">
            <p className="text-sm font-bold text-brand-primary">
              طريقة الاستخدام
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              ثلاث خطوات لتنظيم الرحلة المهنية
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                <FileText size={23} />
              </span>
              <p className="mt-5 text-sm font-bold text-brand-primary">
                الخطوة الأولى
              </p>
              <h3 className="mt-1 text-lg font-black">
                رفع السيرة الذاتية
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                اختيار ملف بصيغة PDF أو Word لبدء تجهيز الملف المهني.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                <Sparkles size={23} />
              </span>
              <p className="mt-5 text-sm font-bold text-brand-primary">
                الخطوة الثانية
              </p>
              <h3 className="mt-1 text-lg font-black">
                مراجعة تحليل الملف
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                الاطلاع على المهارات والخبرات المستخرجة من السيرة الذاتية.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                <Target size={23} />
              </span>
              <p className="mt-5 text-sm font-bold text-brand-primary">
                الخطوة الثالثة
              </p>
              <h3 className="mt-1 text-lg font-black">
                استكشاف فرص التطوير
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                التعرّف على المهارات التي يمكن تطويرها والتوصيات المهنية.
              </p>
            </article>
          </div>
        </section>

        {/* روابط صفحات المرشحين */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <div className="flex items-center gap-3">
            <UserRound className="text-brand-primary" size={23} />
            <div>
              <h2 className="text-xl font-black">مساحة المرشحين</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                اختيار القسم المطلوب.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/candidate/dashboard"
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 font-bold transition hover:border-brand-primary hover:bg-brand-primary/5 dark:border-slate-700"
            >
              <span className="flex items-center gap-3">
                <UserRound className="text-brand-primary" size={19} />
                لوحة التحكم
              </span>
              <ArrowLeft size={17} />
            </Link>

            <Link
              to="/candidate/upload-cv"
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 font-bold transition hover:border-brand-primary hover:bg-brand-primary/5 dark:border-slate-700"
            >
              <span className="flex items-center gap-3">
                <FileText className="text-brand-primary" size={19} />
                رفع السيرة الذاتية
              </span>
              <ArrowLeft size={17} />
            </Link>

            <Link
              to="/candidate/skill-gap"
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 font-bold transition hover:border-brand-primary hover:bg-brand-primary/5 dark:border-slate-700"
            >
              <span className="flex items-center gap-3">
                <Target className="text-brand-primary" size={19} />
                تحليل الفجوة
              </span>
              <ArrowLeft size={17} />
            </Link>

            <Link
              to="/candidate/ai-outputs"
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 font-bold transition hover:border-brand-primary hover:bg-brand-primary/5 dark:border-slate-700"
            >
              <span className="flex items-center gap-3">
                <BriefcaseBusiness className="text-brand-primary" size={19} />
                التوصيات المهنية
              </span>
              <ArrowLeft size={17} />
            </Link>
          </div>
        </section>

        <p className="text-center text-xs leading-6 text-slate-400">
          نتائج المطابقة والتوصيات أدوات مساعدة، ولا تمثل ضمانًا للحصول على وظيفة.
        </p>
      </main>
    </div>
  );
}
