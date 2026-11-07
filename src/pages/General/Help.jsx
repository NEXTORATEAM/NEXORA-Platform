import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      question: "ما هي منصة NEXORA؟",
      answer: "NEXORA منصة توظيف ذكية تستخدم تقنيات الذكاء الاصطناعي لتحليل السير الذاتية ومساعدة المرشحين ومسؤولي التوظيف."
    },
    {
      question: "كيف يمكنني إنشاء حساب؟",
      answer: "يمكنك الانتقال إلى صفحة التسجيل وإدخال بياناتك واختيار نوع الحساب المناسب."
    },
    {
      question: "كيف أرفع سيرتي الذاتية؟",
      answer: "من حساب المرشح انتقل إلى صفحة رفع السيرة الذاتية واختر الملف الذي تريد رفعه."
    },
    {
      question: "ما أنواع الملفات المدعومة؟",
      answer: "تدعم المنصة ملفات PDF وWord بصيغة DOCX وفقًا لإعدادات خدمة معالجة السير الذاتية."
    },
    {
      question: "كيف أحصل على توصيات وظيفية؟",
      answer: "بعد معالجة سيرتك الذاتية وتحليل المهارات، يمكنك الاطلاع على التوصيات الوظيفية المتاحة."
    },
    {
      question: "ماذا أفعل إذا واجهت مشكلة؟",
      answer: "يمكنك زيارة صفحة الدعم الفني وإرسال تفاصيل المشكلة لفريق المنصة."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-5" dir="rtl">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-10">
          <HelpCircle size={45} className="text-brand-primary mx-auto mb-4" />

          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            مركز المساعدة
          </h1>

          <p className="text-slate-500 mt-3">
            ابحث عن إجابات للأسئلة الأكثر شيوعًا.
          </p>
        </div>

        <div className="space-y-4">

          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-5 text-right"
              >
                <span className="font-bold text-slate-800 dark:text-white">
                  {item.question}
                </span>

                <ChevronDown
                  className={`text-brand-primary transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 leading-8 border-t dark:border-slate-700 pt-4">
                  {item.answer}
                </div>
              )}
            </div>
          ))}

        </div>

        <div className="mt-10 bg-blue-50 dark:bg-slate-800 p-6 rounded-2xl text-center">
          <h3 className="font-bold text-slate-800 dark:text-white text-xl mb-2">
            لم تجد إجابة لسؤالك؟
          </h3>

          <p className="text-slate-600 dark:text-slate-300 mb-4">
            يمكنك التواصل مع فريق الدعم الفني.
          </p>
        </div>

      </div>
    </div>
  );
}