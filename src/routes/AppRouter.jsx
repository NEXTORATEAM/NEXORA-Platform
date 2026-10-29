import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// المكونات الثابتة
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// صفحات المصادقة
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// صفحات لوحة الشركات والتوظيف (Recruiter)
import JobPost from '../pages/Recruiter/JobPost';
import Applicants from '../pages/Recruiter/Applicants';
import MarketRadar from '../pages/Recruiter/MarketRadar';

// صفحات المتقدمين والطلاب (Candidate)
import LandingPage from '../pages/Candidate/LandingPage';
import UploadCVPage from '../pages/Candidate/UploadCVPage';
import Dashboard from '../pages/Candidate/Dashboard';
import SkillGap from '../pages/Candidate/SkillGap';
import AIOutputs from '../pages/Candidate/AIOutputs';

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

            {/* صفحة الهبوط العامة */}
            <Route path="/landing" element={<LandingPage />} />

            {/* مسارات لوحة الشركات (Recruiter) */}
            <Route path="/recruiter/add-job" element={<JobPost />} />
            <Route path="/recruiter/applicants" element={<Applicants />} />
            <Route path="/recruiter/market-radar" element={<MarketRadar />} />

            {/* مسارات لوحة الطلاب والباحثين (Candidate) */}
            <Route path="/candidate/dashboard" element={<Dashboard />} />
            <Route path="/candidate/upload-cv" element={<UploadCVPage />} />
            <Route path="/candidate/skill-gap" element={<SkillGap />} />
            <Route path="/candidate/ai-outputs" element={<AIOutputs />} />

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