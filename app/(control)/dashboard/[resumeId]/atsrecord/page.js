'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResumeUploader({ params }) {
  const { resumeId } = params; // Get resumeId from params
  const [error, setError] = useState('');
  const [localJobDescription, setLocalJobDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!localJobDescription.trim()) {
      setError('Please paste the job description');
      return;
    }

    try {
      // Encode the job description for URL safety
      const encodedDescription = encodeURIComponent(localJobDescription);
      
      // Navigate to the analysis page with the job description
      router.push(`/dashboard/${resumeId}/atsrecord/atsresult?jobDescription=${encodedDescription}`);
      
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Failed to proceed to analysis. Please try again.');
    }
  };

  return (
    <div className="w-full mt-20 flex flex-col items-center gap-6 px-4">
      <h2 className="text-2xl font-bold text-center text-white">
        Analyze Your Resume Against Job Description
      </h2>
      <p className="text-center text-gray-300 max-w-md">
        Paste the job description in the text area below and click "Analyze Resume" to see how well your resume matches the job requirements.
      </p>

      {error && (
        <p className="text-red-500 text-sm text-center animate-pulse">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-4">
        <textarea
          placeholder="Paste job description here..."
          className="w-full border rounded-lg border-gray-300 bg-gray-100 p-4 resize-none shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
          rows={13}
          value={localJobDescription}
          onChange={(e) => {
            setLocalJobDescription(e.target.value);
            setError(''); // Clear error when typing
          }}
        />

        <button
          type="submit"
          disabled={!localJobDescription.trim()}
          className={`w-full px-4 text-white bg-blue-600 rounded-lg py-3 font-semibold transition-all duration-300 ${
            localJobDescription.trim()
              ? 'bg-gradient-to-r from-pink-500 to-red-600 hover:opacity-90 hover:font-bold'
              : 'bg-gray-500 cursor-not-allowed'
          }`}
        >
          Analyze Resume
        </button>
      </form>
    </div>
  );
}