import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import Button from '../../components/Button';

export default function AIOutputs() {
  const [form, setForm] = useState({
    name: '',
    jobTitle: '',
    company: '',
  });
  const [letter, setLetter] = useState('');
  const [copied, setCopied] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function createDraft(event) {
    event.preventDefault();

    const draft =
      `السادة/ فريق التوظيف في ${form.company} المحترمين،\n\n` +
      `أتقدم لشغل وظيفة ${form.jobTitle}. أرجو التكرم بمراجعة سيرتي الذاتية، ` +
      `وأتطلع إلى فرصة لمناقشة مدى توافق خبراتي ومهاراتي مع متطلبات الوظيفة.\n\n` +
      `شكرًا لوقتكم واهتمامكم.\n\nمع خالص التحية،\n${form.name || '[الاسم]'}`;

    setLetter(draft);
    setCopied(false);
  }

  async function copyLetter() {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 p-6 font-tajawal text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-10"
    >
      <main className="mx-auto max-w-5xl space-y-8">
        <header className="border-b border-slate-200 pb-6 dark:border-slate-800">
          <h1 className="text-3xl font-black">خطاب التقديم</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            أنشئ مسودة خطاب تقديم مخصصة للوظيفة والشركة.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <form
            onSubmit={createDraft}
            className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-3">
              <FileText className="text-brand-primary" />
              <h2 className="text-lg font-black">بيانات الخطاب</h2>
            </div>

            <label className="block text-sm font-bold">
              الاسم
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 font-normal dark:border-slate-700"
                placeholder="الاسم"
              />
            </label>

            <label className="block text-sm font-bold">
              المسمى الوظيفي
              <input
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 font-normal dark:border-slate-700"
                placeholder="مثال: محلل بيانات"
                required
              />
            </label>

            <label className="block text-sm font-bold">
              اسم الشركة
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 font-normal dark:border-slate-700"
                placeholder="اسم الشركة"
                required
              />
            </label>

            <Button type="submit" variant="primary" className="w-full">
              إنشاء مسودة الخطاب
            </Button>

            <p className="text-xs leading-6 text-slate-400">
              هذه مسودة أولية مبنية على البيانات المدخلة. إنشاء خطاب ذكي مخصص
              يتطلب ربط الخدمة بالـBackend.
            </p>
          </form>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-black">مسودة الخطاب</h2>

            {letter ? (
              <>
                <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-slate-50 p-5 text-sm leading-7 dark:bg-slate-800">
                  {letter}
                </pre>

                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={copyLetter}
                >
                  {copied ? 'تم نسخ الخطاب' : 'نسخ الخطاب'}
                </Button>
              </>
            ) : (
              <p className="mt-4 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                أدخل المسمى الوظيفي واسم الشركة، ثم اختر «إنشاء مسودة الخطاب».
              </p>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}
