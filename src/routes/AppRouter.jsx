import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
<div className="min-h-screen flex flex-col bg-slate-900 text-slate-100" dir="rtl"></div>

// المكونات الثابتة
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// صفحات المصادقة الخاصة بكِ
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// صفحات لوحة الشركات والتوظيف الخاصة بكِ (Recruiter)
import JobPost from '../pages/Recruiter/JobPost';
import Applicants from '../pages/Recruiter/Applicants';
import MarketRadar from '../pages/Recruiter/MarketRadar';
import BatchUpload from '../pages/Recruiter/BatchUpload';

export default function AppRouter() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
        {/* شريط التنقل العلوي الثابت */}
        <Navbar />

        {/* محتوى الصفحات المتغير */}
        <main className="flex-grow">
          <Routes>
            {/* أول ما تفتح المنصة تحولك فوراً وبدون تردد لصفحة تسجيل الدخول */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* مسارات المصادقة (التسجيل ودخول النظام) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* مسارات لوحة الشركات (Recruiter) */}
            <Route path="/recruiter/add-job" element={<JobPost />} />
            <Route path="/recruiter/applicants" element={<Applicants />} />
            <Route path="/recruiter/market-radar" element={<MarketRadar />} />
            <Route path="/recruiter/batch-upload" element={<BatchUpload />} />

            {/* صفحة خطأ 404 لأي مسار غير معروف */}
            <Route path="*" element={<div className="text-center py-20 text-xl font-bold text-slate-600">404 - الصفحة غير موجودة</div>} />
          </Routes>
        </main>

        {/* تذييل الصفحة الثابت */}
        <Footer />
      </div>
    </Router>
  );
}