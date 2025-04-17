'use client';
import React, { useState } from 'react';
import { MdCloudUpload, MdCheckCircle } from 'react-icons/md';

export default function ResumeUploader() {
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [localJobDescription, setLocalJobDescription] = useState('');
  const [uploadedResumeData, setUploadedResumeData] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);




    

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isResumeUploaded) {
      setError('Please upload your resume first');
      return;
    }
    if (!localJobDescription.trim()) {
      setError('Please paste the job description');
      return;
    }
    setJobDescription(localJobDescription);
    onAnalyze();
  };

return (
    <div className="w-full mt-20 flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-center text-white">
            Analyze Your Resume Against Job Description
        </h2>
        <p className="text-center text-gray-300 max-w-md ">
            Paste the job description in the text area below and click "Analyze Resume" to see how well your resume matches the job requirements.
        </p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <textarea
            placeholder="Paste job description here..."
            className="w-full max-w-xl border rounded-lg border-gray-300 bg-slate-200 rounded-md p-4 resize-none shadow-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
            rows={13} // Increased rows for better appearance
        
            onChange={(e) => setLocalJobDescription(e.target.value)}
        />

        <button
            onClick={handleSubmit}
            disabled={!localJobDescription.trim()}
            className={`w-full max-w-lg px-4 text-white rounded-lg py-3 font-semibold transition-all duration-300 bg-gradientPinkRed hover:opacity-90 hover:font-bold disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            Analyze Resume
        </button>
    </div>
);
}
