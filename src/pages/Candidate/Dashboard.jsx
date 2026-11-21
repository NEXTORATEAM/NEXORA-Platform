
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Gauge,
  Sparkles,
  GraduationCap,
  Building2,
  User,
  BriefcaseBusiness,
  AlertCircle,
  Loader2,
} from 'lucide-react';

import candidateService from '../../services/candidateService';

export default function Dashboard() {
  const [analysis, setAnalysis] = useState(null);
  const [cvName, setCvName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchAnalysis() {
      try {
        setIsLoading(true);
        setError('');

        const response = await candidateService.getMyAnalyses();

        if (!isMounted) return;

        const analyses = Array.isArray(response?.analyses)
          ? response.analyses
          : [];

        if (analyses.length > 0) {
          // Get the latest saved analysis
          const latestAnalysis = analyses[0];

          setAnalysis(latestAnalysis);
          setCvName(latestAnalysis.file_name || '');
        } else {
          setAnalysis(null);
          setCvName('');
        }
      } catch (err) {
        if (!isMounted) return;

        setError(
          err?.response?.data?.detail ||
            'تعذّر تحميل نتائج التحليل. يرجى المحاولة مرة أخرى.'
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchAnalysis();

    return () => {
      isMounted = false;
    };
  }, []);

  const skills = Array.isArray(analysis?.skills)
    ? analysis.skills
    : [];

  const organizations = Array.isArray(analysis?.organizations)
    ? analysis.organizations
    : [];

  const degrees = Array.isArray(analysis?.education?.degrees)
    ? analysis.education.degrees
    : [];

  const projects = Array.isArray(analysis?.projects)
    ? analysis.projects
    : [];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 p-6 font-tajawal text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-10"
    >
      <main className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <header className="border-b border-slate-200 pb-6 dark:border-slate-800">
          <h1 className="text-3xl font-black">
            لوحة نتائج التحليل
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            ملخص السيرة الذاتية والبيانات التي استخرجها الذكاء الاصطناعي.
          </p>
        </header>

        {/* Loading */}
        {isLoading && (
          <section className="rounded-3xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <Loader2
              size={36}
              className="mx-auto animate-spin text-brand-primary"
            />

            <p className="mt-4 font-bold">
              جارٍ تحميل نتائج التحليل...
            </p>
          </section>
        )}

        {/* Error */}
        {!isLoading && error && (
          <section className="rounded-3xl border border-red-200 bg-white p-8 text-center dark:border-red-900 dark:bg-slate-900">
            <AlertCircle
              size={36}
              className="mx-auto text-red-500"
            />

            <h2 className="mt-4 text-lg font-black">
              حدث خطأ أثناء تحميل النتائج
            </h2>

            <p className="mt-2 text-sm text-red-500">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-brand-darker px-5 py-3 font-bold text-white"
            >
              إعادة المحاولة
            </button>
          </section>
        )}

        {/* Empty State */}
        {!isLoading && !error && !analysis && (
          <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
            <FileText
              className="mx-auto text-brand-primary"
              size={36}
            />

            <h2 className="mt-4 text-xl font-black">
              لا توجد نتائج تحليل
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              ارفع سيرتك الذاتية حتى نتمكن من تحليلها.
            </p>

            <Link
              to="/candidate/upload-cv"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-darker px-5 py-3 font-bold text-white"
            >
              رفع السيرة الذاتية
              <ArrowLeft size={17} />
            </Link>
          </section>
        )}

        {/* Analysis Results */}
        {!isLoading && !error && analysis && (
          <>
            {/* Summary Cards */}
            <section className="grid gap-5 md:grid-cols-3">

              {/* CV File */}
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <FileText className="text-brand-primary" />

                <h2 className="mt-4 font-bold">
                  ملف السيرة الذاتية
                </h2>

                <p className="mt-2 break-all text-sm text-slate-500 dark:text-slate-400">
                  {cvName || 'غير متوفر'}
                </p>
              </article>

              {/* ATS Score */}
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <Gauge className="text-brand-primary" />

                <h2 className="mt-4 font-bold">
                  مؤشر ATS
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  لم يتم حساب درجة ATS بعد.
                </p>
              </article>

              {/* Skills */}
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <Sparkles className="text-brand-primary" />

                <h2 className="mt-4 font-bold">
                  المهارات المكتشفة
                </h2>

                <p className="mt-2 text-3xl font-black text-brand-primary">
                  {skills.length}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  مهارة مستخرجة من السيرة الذاتية
                </p>
              </article>
            </section>

            {/* Personal Information */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex items-center gap-3">
                <User className="text-brand-primary" />

                <h2 className="text-lg font-black">
                  المعلومات الشخصية
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">
                    الاسم
                  </p>

                  <p className="mt-1 font-bold">
                    {analysis.full_name || 'غير متوفر'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    البريد الإلكتروني
                  </p>

                  <p className="mt-1 break-all font-bold">
                    {analysis.email || 'غير متوفر'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    رقم الهاتف
                  </p>

                  <p className="mt-1 font-bold">
                    {analysis.phone || 'غير متوفر'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    سنوات الخبرة
                  </p>

                  <p className="mt-1 font-bold">
                    {analysis.experience_years > 0
                      ? `${analysis.experience_years} سنوات`
                      : 'غير متوفر'}
                  </p>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex items-center gap-3">
                <Sparkles className="text-brand-primary" />

                <h2 className="text-lg font-black">
                  المهارات المكتشفة
                </h2>
              </div>

              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-xl bg-brand-primary/10 px-4 py-2 text-sm font-bold text-brand-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  لم يتم استخراج مهارات من السيرة الذاتية.
                </p>
              )}
            </section>

            {/* Education */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex items-center gap-3">
                <GraduationCap className="text-brand-primary" />

                <h2 className="text-lg font-black">
                  التعليم والمؤهلات
                </h2>
              </div>

              {degrees.length > 0 ? (
                <ul className="space-y-3">
                  {degrees.map((degree, index) => (
                    <li
                      key={index}
                      className="rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800"
                    >
                      {typeof degree === 'string'
                        ? degree
                        : JSON.stringify(degree)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">
                  لا توجد معلومات تعليمية متاحة.
                </p>
              )}
            </section>

            {/* Organizations */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex items-center gap-3">
                <Building2 className="text-brand-primary" />

                <h2 className="text-lg font-black">
                  المؤسسات وجهات العمل
                </h2>
              </div>

              {organizations.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {organizations.map((organization, index) => (
                    <span
                      key={`${organization}-${index}`}
                      className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold dark:bg-slate-800"
                    >
                      {organization}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  لا توجد جهات عمل مستخرجة.
                </p>
              )}
            </section>

            {/* Projects */}
            {projects.length > 0 && (
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-5 flex items-center gap-3">
                  <BriefcaseBusiness className="text-brand-primary" />

                  <h2 className="text-lg font-black">
                    المشاريع
                  </h2>
                </div>

                <div className="space-y-3">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800"
                    >
                      {typeof project === 'string'
                        ? project
                        : JSON.stringify(project)}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Extraction Quality */}
            {analysis.extraction_quality && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="font-bold">
                  جودة استخراج البيانات
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {analysis.extraction_quality}
                </p>
              </section>
            )}

            {/* Navigation */}
            <section className="flex flex-wrap gap-3">
              <Link
                to="/candidate/skill-gap"
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold dark:border-slate-700"
              >
                عرض تحليل الفجوة
              </Link>

              <Link
                to="/candidate/ai-outputs"
                className="rounded-xl bg-brand-darker px-5 py-3 text-sm font-bold text-white"
              >
                خطاب التقديم
              </Link>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
