"use client";

import React, { useEffect, useState } from "react";
import { analysisCv } from "@/actions/cvs";


export default function Careers({ params }) {
  const { resumeId } = React.use(params);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [resumeId]);


  return (
    <div className="container mx-auto">
      <div className="text-center mb-10 mt-auto">
        <h2 className="text-2xl text-gray-100 font-semibold mb-8">Recommended Careers</h2>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center w-full h-[254px] ml-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primaryBlack"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {careers.map((career, index) => (
            <div key={index} className="relative">
              <div className="bg-[#1E293B] rounded-xl p-8 border border-gray-700 hover:text-blue-400 hover:border-blue-500 group transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl text-gray-50 font-bold">{career.title}</h3>
                  <span className="bg-blue-500/20 px-3 py-1 rounded-full text-blue-400">
                    {career.matchScore}% Match
                  </span>
                </div>
                <p className="text-gray-200 mb-4">{career.description}</p>
                <div className="flex justify-between items-center">
                  <Link href={`/dashboard/${resumeId}/${career.title}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                    View Details
                  </Link>
                  <i className="fas fa-arrow-right text-blue-400"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
