import React from "react";
import { ShieldCheck, Lock, Database } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "البيانات التي يتم تقديمها",
      text: "قد تتضمن البيانات المعلومات الشخصية وبيانات الحساب والسيرة الذاتية والمهارات والخبرات المهنية التي يقدمها المستخدم."
    },
    {
      title: "كيفية استخدام البيانات",
      text: "تُستخدم البيانات المقدمة لتشغيل خدمات المنصة وتحليل السير الذاتية وتقديم التوصيات المتعلقة بالوظائف."
    },
    {
      title: "حماية المعلومات",
      text: "تسعى NEXORA إلى تطبيق إجراءات مناسبة لحماية المعلومات من الوصول أو الاستخدام غير المصرح به."
    },
    {
      title: "مشاركة البيانات",
      text: "ينبغي ألا تتم مشاركة بيانات المستخدم مع أطراف أخرى إلا وفقًا لسياسة المنصة والأسس القانونية والموافقات المطلوبة."
    },
    {
      title: "حقوق المستخدم",
      text: "يمكن للمستخدم التواصل مع فريق المنصة للاستفسار عن بياناته أو طلب تصحيحها أو حذفها وفقًا للسياسات المعتمدة."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-5" dir="rtl">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8">

          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck size={34} className="text-brand-primary" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                سياسة الخصوصية
              </h1>
              <p className="text-slate-500 mt-1">
                خصوصيتك وأمان بياناتك من أولوياتنا
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 dark:bg-slate-700 p-5 rounded-xl">
              <Lock className="text-brand-primary mb-3" size={28} />
              <h3 className="font-bold dark:text-white mb-2">
                حماية البيانات
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                الاهتمام بسرية المعلومات الشخصية.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-slate-700 p-5 rounded-xl">
              <Database className="text-brand-primary mb-3" size={28} />
              <h3 className="font-bold dark:text-white mb-2">
                استخدام البيانات
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                استخدام البيانات لتقديم خدمات المنصة.
              </p>
            </div>
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

          <p className="mt-10 text-sm text-slate-500 border-t dark:border-slate-700 pt-5">
            NEXORA © جميع الحقوق محفوظة
          </p>

        </div>
      </div>
    </div>
  );
}