import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// المكونات المشتركة
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// صفحات تسجيل الدخول والتسجيل
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// صفحات ربا: مسؤول التوظيف
import JobPost from '../pages/Recruiter/JobPost';
import Applicants from '../pages/Recruiter/Applicants';
import MarketRadar from '../pages/Recruiter/MarketRadar';
import BatchUpload from '../pages/Recruiter/BatchUpload';

// صفحات المرشحين
import LandingPage from '../pages/Candidate/LandingPage';
import UploadCVPage from '../pages/Candidate/UploadCVPage';
import Dashboard from '../pages/Candidate/Dashboard';
import SkillGap from '../pages/Candidate/SkillGap';
import AIOutputs from '../pages/Candidate/AIOutputs';
import Recommendations from '../pages/Candidate/Recommendations';

export default function AppRouter() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* الصفحة الرئيسية */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* صفحات تسجيل الدخول والتسجيل */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* صفحات ربا: مسؤول التوظيف */}
            <Route path="/recruiter/add-job" element={<JobPost />} />
            <Route path="/recruiter/applicants" element={<Applicants />} />
            <Route path="/recruiter/market-radar" element={<MarketRadar />} />
            <Route path="/recruiter/batch-upload" element={<BatchUpload />} />

            {/* صفحات المرشحين */}
            <Route path="/candidate" element={<LandingPage />} />
            <Route path="/candidate/upload-cv" element={<UploadCVPage />} />
            <Route path="/candidate/dashboard" element={<Dashboard />} />
            <Route path="/candidate/skill-gap" element={<SkillGap />} />
            <Route path="/candidate/ai-outputs" element={<AIOutputs />} />
            <Route
              path="/candidate/recommendations"
              element={<Recommendations />}
            />

            {/* صفحة غير موجودة */}
            <Route
              path="*"
              element={
                <div className="py-20 text-center text-xl font-bold text-slate-600">
                  404 - الصفحة غير موجودة
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
