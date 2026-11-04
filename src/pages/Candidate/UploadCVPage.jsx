import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, X } from 'lucide-react';
import Button from '../../components/Button';

export default function UploadCVPage() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function chooseFile(selectedFile) {
    setError('');
    if (!selectedFile) return;

    const extension = selectedFile.name.split('.').pop().toLowerCase();
    const allowedTypes = ['pdf', 'doc', 'docx'];

    if (!allowedTypes.includes(extension)) {
      setFile(null);
      setError('نوع الملف غير مدعوم. اختر ملف PDF أو DOC أو DOCX.');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setFile(null);
      setError('حجم الملف أكبر من 10 ميغابايت.');
      return;
    }

    setFile(selectedFile);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setError('اختر ملف السيرة الذاتية أولًا.');
      return;
    }

    // يحفظ اسم الملف للعرض في لوحة التحكم؛ لا يرفع الملف إلى الخادم بعد.
    localStorage.setItem('candidateCvName', file.name);
    navigate('/candidate/dashboard');
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-6 font-tajawal text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-10">
      <main className="mx-auto max-w-4xl">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <header className="border-b border-slate-200 pb-5 dark:border-slate-800">
            <p className="text-sm font-bold text-brand-primary">بوابة المرشحين</p>
            <h1 className="mt-2 text-2xl font-black">رفع السيرة الذاتية</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              اختر ملفًا بصيغة PDF أو Word، بحجم لا يتجاوز 10 ميغابايت.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-primary/40 bg-brand-primary/5 p-6 text-center transition hover:bg-brand-primary/10">
              <UploadCloud size={38} className="text-brand-primary" />
              <span className="mt-4 font-bold">اضغط لاختيار ملف من الجهاز</span>
              <span className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                الأنواع المدعومة: PDF وDOC وDOCX
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(event) => chooseFile(event.target.files?.[0])}
              />
            </label>

            {file && (
              <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="shrink-0 text-emerald-600" />
                  <span className="break-all text-sm font-bold">{file.name}</span>
                </div>
                <button type="button" onClick={() => setFile(null)} aria-label="إزالة الملف">
                  <X className="text-slate-500" />
                </button>
              </div>
            )}

            {error && <p role="alert" className="text-sm font-bold text-red-600">{error}</p>}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="primary" className="w-full">
                حفظ الملف ومتابعة
              </Button>
              <Link to="/candidate/dashboard" className="rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-bold dark:border-slate-700">
                العودة إلى لوحة التحكم
              </Link>
            </div>

            <p className="text-xs leading-6 text-slate-400">
              نسخة الواجهة الحالية تحفظ اسم الملف في المتصفح فقط. رفع الملف وتحليله يحتاج ربط الخادم.
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}
