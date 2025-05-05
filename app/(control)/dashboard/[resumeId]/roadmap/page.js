"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { careerpath } from "@/actions/cvs";

function Roadmap({ params }) {
  const [career, setCareer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const { resumeId } = React.use(params);

  const desiredCareer = searchParams.get('desiredCareer');

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const response = await careerpath(resumeId, desiredCareer);
        setCareer(response.roadmap.data.modules);
      } catch (error) {
        setError("Failed to load jobs data");
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-8 max-w-6xl text-white text-center">
        <div className="animate-pulse text-xl text-blue-300">Loading career...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 max-w-6xl text-white text-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mt-5 mb-5 mx-auto text-white px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          {desiredCareer} Roadmap
        </h1>
        <p className="text-xl text-gray-400">
          A year-long journey to becoming a {desiredCareer}
        </p>
      </div>

      <div className="relative overflow-x-auto">
        {/* Vertical center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#1e21fc] z-0" />

        {career.map((module, index) => (
          <div key={index} className="relative mb-16 flex justify-center">
            {/* Timeline Dot */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#1e21fc] rounded-full z-10" />

            <div
              className={`flex flex-col sm:flex-row items-center w-full max-w-5xl ${
                module.side === "right" ? "sm:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full sm:w-[45%] z-10">
                <div
                  className={`bg-[#1E293B] border border-gray-700 p-6 sm:p-10 shadow-lg 
                  ${module.side === "left" ? "rounded-l-lg sm:rounded-r-lg sm:rounded-l-none" : "rounded-r-lg sm:rounded-l-lg sm:rounded-r-none"}`}
                >
                  <div className="inline-block px-4 py-1 bg-[#1e21fc] rounded-full text-sm mb-4 text-white font-semibold">
                    {module.time}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{module.name}</h3>
                  <p className="text-gray-300 mb-4">{module.description}</p>
                  <ul className="space-y-2 text-gray-200">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-[#1e21fc] rounded-full mr-2" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <button className="px-8 py-4 rounded-lg bg-blue-600 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300 text-white shadow-lg">
          Join Community
        </button>
      </div>
    </div>
  );
}

export default Roadmap;
