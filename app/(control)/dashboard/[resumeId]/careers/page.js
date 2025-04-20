"use client";
import React, { useEffect, useState } from "react";
import { analysisCv } from "@/actions/cvs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Careers({ params }) {
  const { resumeId } = React.use(params);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await analysisCv(resumeId);
        const sortedCareers = response.careers.data.careers.sort(
          (a, b) => b.matchScore - a.matchScore
        );
        setCareers(sortedCareers);
      } catch (error) {
        console.error("Error fetching careers:", error);
        setError("Failed to load career recommendations");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [resumeId]);


 const handletherouting = (career) => {

    router.push(`/dashboard/${resumeId}/roadmap?desiredCareer=${career.title}`);

  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-100 mb-2">Recommended Careers</h2>
        <p className="text-gray-400">Based on your resume analysis</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-10 bg-red-900/20 rounded-lg">
          <div className="text-red-400 mb-2">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Success State */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6">
          {careers.map((career, index) => (
            <div 
              key={index} 
              className="bg-[#1E293B] rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-50">{career.title}</h3>
                  <span className="bg-blue-500/20 px-3 py-1 rounded-full text-blue-400 text-sm font-medium">
                    {career.matchScore}% Match
                  </span>
                </div>
                
                <p className="text-gray-300">{career.description}</p>
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                <p

           className="text-blue-400 cursor-pointer hover:text-blue-300 transition-colors flex items-center"
           onClick={() => handletherouting(career)}
                  >
                    View Details
                    <svg 
                      className="w-4 h-4 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && careers.length === 0 && (
        <div className="text-center py-12 bg-[#1E293B] rounded-xl">
          <div className="text-gray-400 mb-4">
            <svg 
              className="mx-auto h-12 w-12" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-300 mb-2">
            No career recommendations found
          </h3>
          <p className="text-gray-500">
            We couldn't find any career matches based on your resume
          </p>
        </div>
      )}
    </div>
  );
}