import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// المكونات الثابتة
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// صفحات المصادقة
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// صفحة نشر الوظيفة للشركات
import JobPost from '../pages/Recruiter/JobPost';

// صفحة رفع السير الذاتية للشركات
import BatchUpload from '../pages/Recruiter/BatchUpload';

// صفحة جدول الفرز والترتيب الآلي للمتقدمين
import Applicants from '../pages/Recruiter/Applicants';

export default function AppRouter() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
        {/* شريط التنقل العلوي الثابت */}
        <Navbar />

        {/* محتوى الصفحات المتغير */}
        <main className="flex-grow">
          <Routes>
            {/* أول ما تفتح المنصة تحولك تلقائياً لصفحة تسجيل الدخول */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* مسارات المصادقة */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* مسار صفحة نشر الوظيفة للشركات */}
            <Route path="/recruiter/add-job" element={<JobPost />} />

            {/* مسار صفحة رفع السير الذاتية للشركات */}
            <Route path="/recruiter/batch-upload" element={<BatchUpload />} />

            {/* مسار جدول الفرز والترتيب الآلي للمتقدمين */}
            <Route path="/recruiter/applicants" element={<Applicants />} />

            {/* صفحة خطأ 404 لأي مسار آخر */}
            <Route path="*" element={<div className="text-center py-20 text-xl font-bold text-slate-600">404 - الصفحة غير موجودة</div>} />
          </Routes>
        </main>

        {/* تذييل الصفحة الثابت */}
        <Footer />
      </div>
    </Router>
  );
}