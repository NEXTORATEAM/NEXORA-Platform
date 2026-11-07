import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BriefcaseBusiness, MapPin, Search } from 'lucide-react';
import Button from '../../components/Button';

export default function LandingPage() {
  // ستُستبدل هذه القائمة ببيانات الشواغر القادمة من الـBackend.
  const jobs = [];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-6 font-tajawal text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-10">
      <main className="mx-auto max-w-7xl space-y-10">
        <section className="rounded-3xl bg-brand-darker p-8 text-white shadow-sm md:p-12">
          <p className="text-sm font-bold text-blue-200">NEXORA</p>
          <h1 className="mt-3 text-3xl font-black md:text-5xl">
            اكتشف فرصتك المهنية القادمة
          </h1>
          <p className="mt-4 max-w-2xl leading-8 text-blue-100">
            استعرض الشواغر، تعرّف على متطلباتها، وارفع سيرتك الذاتية لمراجعة مدى
            توافق مهاراتك مع الوظيفة.
          </p>
          <Link to="/candidate/upload-cv" className="mt-6 inline-block">
            <Button variant="accent" size="md">
              رفع السيرة الذاتية <ArrowLeft size={17} />
            </Button>
          </Link>
        </section>

        <section>
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-black">الشواغر الوظيفية</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                الوظائف المنشورة والمتاحة للتقديم.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
              <Search size={17} />
              استعراض الوظائف
            </div>
          </div>

          {jobs.length > 0 ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <article key={job.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-lg font-black">{job.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{job.company}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><BriefcaseBusiness size={14} />{job.type}</span>
                    <span className="inline-flex items-center gap-1"><MapPin size={14} />{job.location}</span>
                  </div>
                  <Link to={`/candidate/upload-cv?jobId=${job.id}`} className="mt-5 inline-flex items-center gap-2 font-bold text-brand-primary">
                    عرض الوظيفة والتقديم <ArrowLeft size={16} />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
              <BriefcaseBusiness className="mx-auto text-brand-primary" size={36} />
              <h3 className="mt-4 text-lg font-black">لا توجد شواغر معروضة حاليًا</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                ستظهر الوظائف هنا عند نشرها وربطها بالنظام.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
