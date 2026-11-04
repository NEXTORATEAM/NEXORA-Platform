import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// المكونات الثابتة المشتركة
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// صفحات المصادقة
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// صفحات لوحة الشركات والتوظيف (Recruiter)
import JobPost from '../pages/Recruiter/JobPost';
import Applicants from '../pages/Recruiter/Applicants';
import MarketRadar from '../pages/Recruiter/MarketRadar';
import BatchUpload from '../pages/Recruiter/BatchUpload';

// صفحات بوابة المرشحين (Candidate)
import LandingPage from '../pages/Candidate/LandingPage';
import CandidateDashboard from '../pages/Candidate/Dashboard';
import UploadCVPage from '../pages/Candidate/UploadCVPage';
import SkillGap from '../pages/Candidate/SkillGap';
import AIOutputs from '../pages/Candidate/AIOutputs';

export default function AppRouter() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
        {/* الشريط العلوي المشترك */}
        <Navbar />

        {/* محتوى الصفحات */}
        <main className="flex-grow">
          <Routes>
            {/* الصفحة الرئيسية تفتح صفحة تسجيل الدخول */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* صفحات المصادقة */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* مسارات لوحة الشركات والتوظيف (Recruiter) */}
            <Route path="/recruiter/add-job" element={<JobPost />} />
            <Route path="/recruiter/applicants" element={<Applicants />} />
            <Route path="/recruiter/market-radar" element={<MarketRadar />} />
            <Route path="/recruiter/batch-upload" element={<BatchUpload />} />

            {/* مسارات بوابة المرشحين (Candidate) */}
            <Route path="/candidate" element={<LandingPage />} />
            <Route
              path="/candidate/dashboard"
              element={<CandidateDashboard />}
            />
            <Route
              path="/candidate/upload-cv"
              element={<UploadCVPage />}
            />
            <Route path="/candidate/skill-gap" element={<SkillGap />} />
            <Route path="/candidate/ai-outputs" element={<AIOutputs />} />

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

        {/* التذييل المشترك */}
        <Footer />
      </div>
    </Router>
  );
}
