// import React, { useState } from 'react';
// import Login from './pages/Auth/Login';
// import Register from './pages/Auth/Register';

// export default function App() {
//   // حالة بسيطة للتبديل بين الصفحات للتجربة قبل إعداد الـ React Router
//   const [currentPage, setCurrentPage] = useState('login');

//   return (
//     <div className="min-h-screen bg-slate-100">
//       {/* شريط علوي مؤقت لمعاينة وتجربة الصفحات */}
//       <div className="bg-brand-darker text-white p-3 flex justify-center items-center gap-4 text-sm font-tajawal shadow-md">
//         <span>أنتِ الآن في طور المعاينة:</span>
//         <button
//           onClick={() => setCurrentPage('login')}
//           className={`px-4 py-1.5 rounded-lg transition-all ${
//             currentPage === 'login'
//               ? 'bg-brand-primary text-white font-bold'
//               : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
//           }`}
//         >
//           صفحة تسجيل الدخول (Login)
//         </button>
//         <button
//           onClick={() => setCurrentPage('register')}
//           className={`px-4 py-1.5 rounded-lg transition-all ${
//             currentPage === 'register'
//               ? 'bg-brand-primary text-white font-bold'
//               : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
//           }`}
//         >
//           صفحة إنشاء حساب (Register)
//         </button>
//       </div>

//       {/* عرض الصفحة المختارة */}
//       <main>
//         {currentPage === 'login' ? <Login /> : <Register />}
//       </main>
//     </div>
//   );
// }

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Button from './components/Button';
import Input from './components/Input';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

export default function App() {
  const [currentView, setCurrentView] = useState('components'); // 'components' | 'login' | 'register'
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-tajawal" dir="rtl">
      {/* شريط التنقل العلوي Navbar */}
      <Navbar />

      {/* شريط أزرار المعاينة السريعة للتنقل بين الصفحات والمكونات */}
      <div className="bg-brand-darker text-white py-3 px-6 shadow-inner flex flex-wrap justify-center items-center gap-4 text-sm">
        <span className="font-bold text-brand-soft">لوحة اختبار المكونات:</span>
        <button
          onClick={() => setCurrentView('components')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            currentView === 'components' ? 'bg-brand-primary text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          اختبار العناصر (Buttons & Inputs)
        </button>
        <button
          onClick={() => setCurrentView('login')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            currentView === 'login' ? 'bg-brand-primary text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          صفحة تسجيل الدخول (Login)
        </button>
        <button
          onClick={() => setCurrentView('register')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            currentView === 'register' ? 'bg-brand-primary text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          صفحة إنشاء حساب (Register)
        </button>
      </div>

      {/* المحتوى المتغير حسب الاختيار */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentView === 'login' && <Login />}
        {currentView === 'register' && <Register />}

        {currentView === 'components' && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-8">
            <div className="text-center space-y-2 border-b border-slate-100 pb-6">
              <h1 className="text-2xl font-bold text-brand-darker">اختبار المكونات المشتركة (Reusable Components)</h1>
              <p className="text-sm text-slate-500">هذه صفحة تجريبية للتأكد من استعراض الأزرار وحقول الإدخال والـ Navbar والـ Footer بنجاح.</p>
            </div>

            {/* اختبار الأزرار */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-brand-dark">1. الأزرار (Buttons)</h2>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">زر أساسي</Button>
                <Button variant="outline">زر حدود</Button>
                <Button variant="secondary">زر ثانوي</Button>
              </div>
            </div>

            {/* اختبار حقول الإدخال */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-lg font-semibold text-brand-dark">2. حقول الإدخال (Inputs)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="البريد الإلكتروني"
                  type="email"
                  placeholder="recruiter@company.com"
                />
                <Input
                  label="عنوان الوظيفة"
                  type="text"
                  placeholder="مثال: مهندس بيانات / Data Scientist"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* تذييل الصفحة Footer */}
      <Footer />
    </div>
  );
}