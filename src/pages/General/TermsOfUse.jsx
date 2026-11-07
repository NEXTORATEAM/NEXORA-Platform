import React from "react";
import { FileText, ShieldCheck, AlertCircle } from "lucide-react";

export default function TermsOfUse() {
  const sections = [
    {
      title: "1. قبول الشروط",
      text: "باستخدامك منصة NEXORA فإنك توافق على الالتزام بشروط الاستخدام والسياسات المرتبطة بالمنصة."
    },
    {
      title: "2. استخدام المنصة",
      text: "تُستخدم المنصة لتسهيل عمليات التوظيف وتحليل السير الذاتية ومطابقة مهارات المرشحين مع متطلبات الوظائف."
    },
    {
      title: "3. مسؤولية المستخدم",
      text: "يلتزم المستخدم بتقديم معلومات صحيحة وعدم استخدام المنصة لأي غرض غير قانوني أو غير مصرح به."
    },
    {
      title: "4. الحسابات",
      text: "يتحمل المستخدم مسؤولية المحافظة على بيانات تسجيل الدخول الخاصة به وعدم مشاركتها مع الآخرين."
    },
    {
      title: "5. التعديلات",
      text: "قد يتم تحديث شروط الاستخدام عند الحاجة، وسيتم نشر النسخة المحدثة في هذه الصفحة."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-5" dir="rtl">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={32} className="text-brand-primary" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                شروط الاستخدام
              </h1>
              <p className="text-slate-500 mt-1">
                تعرف على شروط استخدام منصة NEXORA
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-slate-700 p-4 rounded-xl mb-8">
            <p className="text-slate-700 dark:text-slate-200 leading-7">
              توضح هذه الصفحة القواعد الأساسية لاستخدام منصة NEXORA
              والخدمات التي تقدمها.
            </p>
          </div>

          <div className="space-y-7">
            {sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {section.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-8">
                  {section.text}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-10 border-t dark:border-slate-700 pt-5 text-sm text-slate-500">
            NEXORA © جميع الحقوق محفوظة
          </div>
        </div>

      </div>
    </div>
  );
}