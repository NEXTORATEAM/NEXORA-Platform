import React, { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Bell,
  Globe
} from "lucide-react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("ar");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-5" dir="rtl">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon size={35} className="text-brand-primary" />

          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              الإعدادات
            </h1>

            <p className="text-slate-500 mt-1">
              خصص تجربتك في منصة NEXORA
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm divide-y dark:divide-slate-700">

          {/* Appearance */}

          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {darkMode ? (
                <Moon className="text-brand-primary" size={26} />
              ) : (
                <Sun className="text-brand-primary" size={26} />
              )}

              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">
                  المظهر
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  تفعيل الوضع الليلي أو النهاري
                </p>
              </div>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-7 rounded-full relative transition ${
                darkMode ? "bg-brand-primary" : "bg-slate-300"
              }`}
              aria-label="تغيير المظهر"
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                  darkMode ? "right-1" : "right-8"
                }`}
              />
            </button>
          </div>

          {/* Notifications */}

          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Bell className="text-brand-primary" size={26} />

              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">
                  الإشعارات
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  تفعيل أو إيقاف الإشعارات
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5 accent-blue-600"
            />
          </div>

          {/* Language */}

          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Globe className="text-brand-primary" size={26} />

              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">
                  اللغة
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  اختر لغة الواجهة
                </p>
              </div>
            </div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded-lg p-2 dark:bg-slate-700 dark:text-white dark:border-slate-600"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>

        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          NEXORA © جميع الحقوق محفوظة
        </p>

      </div>
    </div>
  );
}