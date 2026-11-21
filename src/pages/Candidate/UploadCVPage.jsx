
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Loader2, UploadCloud, X } from 'lucide-react';
import Button from '../../components/Button';
import candidateService from '../../services/candidateService';

export default function UploadCVPage() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  function handleFileChange(selectedFile) {
    setError('');
    setStatusMessage('');

    if (!selectedFile) return;

    const extension = selectedFile.name.split('.').pop().toLowerCase();

    if (!['pdf', 'docx'].includes(extension)) {
      setFile(null);
      setError('نوع الملف غير مدعوم. اختر ملف PDF أو DOCX.');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setFile(null);
      setError('حجم الملف يجب ألا يتجاوز 10 ميغابايت.');
      return;
    }

    setFile(selectedFile);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError('');
    setStatusMessage('');

    if (!file) {
      setError('اختر ملف السيرة الذاتية أولًا.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload the actual resume file to the backend
      const response = await candidateService.uploadResume(file);

      // Verify upload, analysis, and database persistence
      if (
        !response ||
        response.upload_status !== 'success' ||
        response.analysis_completed !== true ||
        response.analysis_persisted !== true
      ) {
        setError(
          response?.analysis_error ||
            'لم تكتمل عملية تحليل السيرة الذاتية وحفظ نتائجها.'
        );
        return;
      }

      setStatusMessage(
        'تم رفع السيرة الذاتية وتحليلها وحفظها بنجاح.'
      );

      // Navigate to the candidate dashboard
      navigate('/candidate/dashboard', {
        state: {
          uploadResult: response,
          fileName: file.name,
        },
      });
    } catch (err) {
      const backendMessage =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message;

      setError(
        typeof backendMessage === 'string' && backendMessage.trim()
          ? backendMessage
          : 'تعذّر رفع السيرة الذاتية. يرجى المحاولة مرة أخرى.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 p-6 font-tajawal text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-10"
    >
      <main className="mx-auto max-w-4xl">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <header className="border-b border-slate-200 pb-5 dark:border-slate-800">
            <h1 className="text-2xl font-black">
              رفع السيرة الذاتية
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              اختر ملف PDF أو DOCX بحجم لا يتجاوز 10 ميغابايت.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-primary/40 bg-brand-primary/5 p-6 text-center hover:bg-brand-primary/10">
              <UploadCloud
                size={38}
                className="text-brand-primary"
              />

              <span className="mt-4 font-bold">
                اضغط لاختيار ملف السيرة الذاتية
              </span>

              <span className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                الصيغ المدعومة: PDF وDOCX
              </span>

              <input
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                disabled={isSubmitting}
                onChange={(event) =>
                  handleFileChange(event.target.files?.[0])
                }
              />
            </label>

            {file && (
              <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="shrink-0 text-emerald-600" />

                  <span className="break-all text-sm font-bold">
                    {file.name}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setFile(null)}
                  aria-label="إزالة الملف"
                >
                  <X className="text-slate-500" />
                </button>
              </div>
            )}

            {statusMessage && (
              <p
                role="status"
                className="text-sm font-bold text-emerald-600"
              >
                {statusMessage}
              </p>
            )}

            {error && (
              <p
                role="alert"
                className="text-sm font-bold text-red-600"
              >
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    جارٍ الرفع والتحليل...
                  </>
                ) : (
                  'متابعة إلى لوحة النتائج'
                )}
              </Button>

              <Link
                to="/candidate"
                className="rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-bold dark:border-slate-700"
              >
                العودة إلى صفحة الوظائف
              </Link>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
