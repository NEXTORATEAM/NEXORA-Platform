import React, { useState } from "react";
import { Headphones, Send, Mail, MessageSquare } from "lucide-react";

export default function TechnicalSupport() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-5" dir="rtl">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-10">
          <Headphones size={45} className="text-brand-primary mx-auto mb-4" />

          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            الدعم الفني
          </h1>

          <p className="text-slate-500 mt-3">
            نحن هنا لمساعدتك في حل المشكلات والإجابة عن استفساراتك.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8">

          <div className="flex items-center gap-3 mb-7">
            <MessageSquare className="text-brand-primary" size={26} />
            <h2 className="text-xl font-bold dark:text-white">
              أرسل استفسارك
            </h2>
          </div>

          {success && (
            <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-5">
              تم تسجيل الطلب تجريبيًا بنجاح.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block mb-2 font-semibold dark:text-white">
                الاسم
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                placeholder="أدخل اسمك"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold dark:text-white">
                البريد الإلكتروني
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold dark:text-white">
                موضوع المشكلة
              </label>

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                placeholder="ما موضوع استفسارك؟"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold dark:text-white">
                تفاصيل المشكلة
              </label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full p-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                placeholder="اكتب تفاصيل المشكلة هنا..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-dark text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Send size={18} />
              إرسال الطلب
            </button>

          </form>

          <div className="mt-8 border-t dark:border-slate-700 pt-6">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <Mail className="text-brand-primary" />
              <span>البريد الإلكتروني: nexora2027@gmail.com</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}