import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

export default function BatchUpload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);

    // محاكاة عملية رفع الملف وفك الضغط والتحليل بالـ Backend
    setTimeout(() => {
      setIsUploading(false);
      // الانتقال مباشرة إلى جدول الفرز والترتيب الذكي للمتقدمين
      navigate('/recruiter/applicants');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6 md:p-10 font-tajawal transition-colors duration-300" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl space-y-6 shadow-sm transition-colors duration-300">
          
          <div className="text-center space-y-2 border-b border-slate-100 dark:border-slate-800 pb-6">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white font-tajawal">رفع  السير الذاتية (ZIP)</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">قم برفع الملف المضغوط الذي يحتوي على السير الذاتية للبدء في الفرز الآلي بواسطة الذكاء الاصطناعي</p>
          </div>

          <form onSubmit={handleUpload} className="space-y-6">
            {/* منطقة الرفع السحب والإفلات */}
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-primary dark:hover:border-brand-primary rounded-3xl p-10 text-center space-y-4 bg-slate-50/50 dark:bg-slate-900/50 transition cursor-pointer relative">
              <input 
                type="file" 
                accept=".zip,.rar"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="w-16 h-16 bg-brand-soft/20 text-brand-primary dark:text-brand-light rounded-2xl flex items-center justify-center mx-auto text-2xl border border-brand-primary/20">
                📦
              </div>

              <div>
                <p className="text-base font-bold text-slate-800 dark:text-white">
                  {selectedFile ? selectedFile.name : 'اضغط هنا لرفع الملف أو اسحبه إلى هنا'}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">يُقبل الملفات المضغوطة بصيغة ZIP أو RAR  </p>
              </div>
            </div>

            {/* استخدام مكون الـ Button الجاهز من ملفاتك */}
            <Button 
              type="submit" 
              variant="primary"
              size="md"
              isLoading={isUploading}
              disabled={!selectedFile}
              className="w-full py-3.5"
            >
              {isUploading ? 'جاري رفع الملف وتحليل السير الذاتية...' : 'بدء الفرز والتحليل الآلي (ATS)'}
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}