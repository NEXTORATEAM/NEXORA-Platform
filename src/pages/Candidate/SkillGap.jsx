import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CircleHelp,
  Lightbulb,
  Target,
} from 'lucide-react';

function readCandidateAnalysis() {
  try {
    const savedAnalysis = localStorage.getItem('candidateAnalysis');
    return savedAnalysis ? JSON.parse(savedAnalysis) : null;
  } catch {
    return null;
  }
}

export default function SkillGap() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    setAnalysis(readCandidateAnalysis());
  }, []);

  const skillGaps = Array.isArray(analysis?.skillGaps)
    ? analysis.skillGaps
    : [];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 p-6 font-tajawal text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-10"
    >
      <main className="mx-auto max-w-7xl space-y-8">
        <header className="border-b border-slate-200 pb-6 dark:border-slate-800">
          <h1 className="text-3xl font-black">تحليل الفجوة المهارية</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            مقارنة المهارات الموجودة في السيرة الذاتية بمتطلبات الوظيفة المحددة.
          </p>
        </header>

        {skillGaps.length > 0 ? (
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 p-6 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <Target className="text-brand-primary" size={22} />
                <div>
                  <h2 className="text-lg font-black">نتائج المقارنة</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    المهارات التي تحتاج إلى مراجعة أو تطوير.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <tr>
                    <th className="p-4 font-bold">المهارة المطلوبة</th>
                    <th className="p-4 font-bold">الحالة</th>
                    <th className="p-4 font-bold">ملاحظة</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {skillGaps.map((item, index) => {
                    const skill =
                      typeof item === 'string'
                        ? item
                        : item.skill || `مهارة ${index + 1}`;

                    const status =
                      typeof item === 'string'
                        ? 'تحتاج إلى مراجعة'
                        : item.status || 'تحتاج إلى مراجعة';

                    const note =
                      typeof item === 'string'
                        ? 'راجع متطلبات الوظيفة لهذه المهارة.'
                        : item.note ||
                          item.description ||
                          'لا توجد ملاحظة إضافية.';

                    return (
                      <tr key={`${skill}-${index}`}>
                        <td className="p-4 font-bold">{skill}</td>
                        <td className="p-4">
                          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
                            {status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500 dark:text-slate-400">
                          {note}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-12">
            <Target className="mx-auto text-brand-primary" size={38} />
            <h2 className="mt-4 text-xl font-black">
              لا توجد نتيجة تحليل بعد
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
              يظهر تحليل الفجوة بعد توفر سيرة ذاتية ونتيجة تحليلها واختيار وظيفة
              للمقارنة. لن تُعرض فجوات أو مهارات افتراضية قبل وصول البيانات.
            </p>
            <Link
              to="/candidate/upload-cv"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-darker px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
            >
              رفع السيرة الذاتية
              <ArrowLeft size={17} />
            </Link>
          </section>
        )}

        {/* زر التوصيات ظاهر دائمًا */}
        <section className="flex flex-col gap-4 rounded-3xl border border-brand-primary/20 bg-brand-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-brand-primary shadow-sm dark:bg-slate-900">
              <Lightbulb size={21} />
            </span>

            <div>
              <h2 className="text-lg font-black">التوصيات المهنية</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                انتقل إلى صفحة التوصيات وخارطة التعلّم. ستظهر التوصيات المبنية
                على التحليل عند توفر بياناته.
              </p>
            </div>
          </div>

          <Link
            to="/candidate/recommendations"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-darker px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
          >
            عرض التوصيات
            <ArrowLeft size={17} />
          </Link>
        </section>

        <p className="flex items-start gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          <CircleHelp className="mt-1 shrink-0 text-amber-500" size={18} />
          تعتمد نتيجة الفجوة على مقارنة المهارات المستخرجة بمتطلبات وظيفة محددة.
          التحليل والتوصيات الفعلية تتطلب ربط الصفحة بالـBackend.
        </p>
      </main>
    </div>
  );
}
