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

// صفحات مسؤول التوظيف
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

// الصفحات العامة
import TermsOfUse from '../pages/General/TermsOfUse';
import PrivacyPolicy from '../pages/General/PrivacyPolicy';
import TechnicalSupport from '../pages/General/TechnicalSupport';
import Help from '../pages/General/Help';
import Settings from '../pages/General/Settings';

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

            {/* صفحات مسؤول التوظيف */}
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

            {/* الصفحات العامة */}
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/support" element={<TechnicalSupport />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />

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