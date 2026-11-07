import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  CircleHelp,
  Clock3,
  Lightbulb,
  Target,
} from 'lucide-react';

function readAnalysis() {
  try {
    const savedAnalysis = localStorage.getItem('candidateAnalysis');
    return savedAnalysis ? JSON.parse(savedAnalysis) : null;
  } catch {
    return null;
  }
}

function getPriorityLabel(priority) {
  const labels = {
    high: 'أولوية مرتفعة',
    medium: 'أولوية متوسطة',
    low: 'أولوية منخفضة',
  };

  return labels[priority] || 'توصية مقترحة';
}

export default function Recommendations() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    setAnalysis(readAnalysis());
  }, []);

  const recommendations = Array.isArray(analysis?.recommendations)
    ? analysis.recommendations
    : [];

  const skillGaps = Array.isArray(analysis?.skillGaps)
    ? analysis.skillGaps
    : [];

  const hasRecommendations = recommendations.length > 0;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 p-6 font-tajawal text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-10"
    >
      <main className="mx-auto max-w-7xl space-y-8">

        {/* عنوان الصفحة */}
        <header className="border-b border-slate-200 pb-6 dark:border-slate-800">
          <p className="text-sm font-bold text-brand-primary">
            تطوير المسار المهني
          </p>

          <h1 className="mt-2 text-3xl font-black">
            التوصيات وخارطة التعلّم
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500 dark:text-slate-400">
            توصيات لتطوير المهارات بناءً على الفجوات التي تظهر عند مقارنة السيرة
            الذاتية بمتطلبات الوظيفة.
          </p>
        </header>

        {/* حالة وجود توصيات */}
        {hasRecommendations ? (
          <section className="space-y-5">
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <Lightbulb className="mt-1 shrink-0 text-emerald-600" size={20} />
              <div>
                <h2 className="font-bold">توصيات مبنية على نتيجة التحليل</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  رُتبت التوصيات حسب البيانات المتوفرة في تحليل المهارات.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {recommendations.map((recommendation, index) => {
                const title =
                  recommendation.title ||
                  recommendation.skill ||
                  `توصية ${index + 1}`;

                const description =
                  recommendation.description ||
                  recommendation.reason ||
                  'راجع هذه المهارة وطوّرها بما يتناسب مع متطلبات الوظيفة.';

                const priority =
                  recommendation.priority || 'medium';

                return (
                  <article
                    key={`${title}-${index}`}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                        <BookOpen size={22} />
                      </span>

                      <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold text-brand-darker dark:text-brand-soft">
                        {getPriorityLabel(priority)}
                      </span>
                    </div>

                    <h2 className="mt-5 text-lg font-black">{title}</h2>

                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {description}
                    </p>

                    {recommendation.action && (
                      <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                        <p className="text-xs font-bold text-brand-primary">
                          خطوة مقترحة
                        </p>
                        <p className="mt-1 text-sm leading-6">
                          {recommendation.action}
                        </p>
                      </div>
                    )}

                    {recommendation.resource && (
                      <a
                        href={recommendation.resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-dark"
                      >
                        {recommendation.resource.label || 'مصدر للتعلّم'}
                        <ArrowLeft size={16} />
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ) : (
          /* حالة عدم توفر توصيات */
          <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-12">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
              <Lightbulb size={30} />
            </span>

            <h2 className="mt-5 text-xl font-black">
              لا توجد توصيات بعد
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
              تظهر التوصيات بعد تحليل السيرة الذاتية ومقارنتها بمتطلبات وظيفة.
              عند توفر النتيجة، تُعرض هنا المهارة المطلوب تطويرها والخطوة المقترحة
              والأولوية.
            </p>

            {skillGaps.length > 0 && (
              <p className="mx-auto mt-4 max-w-2xl rounded-2xl bg-brand-primary/5 p-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                توجد {skillGaps.length} مهارة في تحليل الفجوة، لكن لا توجد
                توصيات محفوظة لها بعد.
              </p>
            )}

            <Link
              to="/candidate/skill-gap"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-brand-primary px-5 py-3 text-sm font-bold text-brand-darker transition hover:bg-brand-primary hover:text-white dark:text-white"
            >
              العودة إلى تحليل الفجوة
              <ArrowLeft size={17} />
            </Link>
          </section>
        )}

        {/* خارطة التعلّم */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
              <Target size={21} />
            </span>

            <div>
              <h2 className="text-lg font-black">خارطة التعلّم</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                تُرتب خطوات التطوير اعتمادًا على المهارات الناقصة وأولويات الوظيفة.
              </p>
            </div>
          </div>

          {skillGaps.length > 0 ? (
            <ol className="mt-6 space-y-3">
              {skillGaps.map((gap, index) => {
                const skill =
                  typeof gap === 'string' ? gap : gap.skill || `مهارة ${index + 1}`;

                return (
                  <li
                    key={`${skill}-${index}`}
                    className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-sm font-black text-brand-primary shadow-sm dark:bg-slate-900">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold">{skill}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        أضف خطة تعلم أو تدريب عند توفر توصية مناسبة لهذه المهارة.
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <Clock3 className="mt-1 shrink-0 text-slate-400" size={18} />
              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                خارطة التعلّم ستظهر بعد وصول الفجوات المهارية من نتيجة التحليل.
              </p>
            </div>
          )}
        </section>

        {/* توضيح مصدر البيانات */}
        <p className="flex items-start gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          <CircleHelp className="mt-1 shrink-0 text-amber-500" size={18} />
          هذه الواجهة تعرض البيانات الموجودة في
          <code className="mx-1 rounded bg-white/70 px-1 dark:bg-slate-900">
            candidateAnalysis
          </code>
          داخل المتصفح. التوصيات الفعلية تتطلب أن يرسلها الـBackend ضمن نتيجة التحليل.
        </p>

      </main>
    </div>
  );
}
