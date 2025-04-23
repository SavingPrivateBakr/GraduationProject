"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/cards/cardcopied";
import useAppContext from "@/hooks/useAppContext";
import { useEffect,useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

export default function Decision({ params }) {
  const { resumeData, getResumeWithId } = useAppContext();
  const { resumeId } = params;
  const router = useRouter();
  
  const [isExpanded, setIsExpanded] = useState(false);

  if (resumeData == null) {
    getResumeWithId(resumeId);   
  }

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const actionCards = [
    {
      title: "AI Career Recommendation",
      description: "Let AI suggest the best career path based on your skills and experience",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      ),
      route: `/dashboard/${resumeId}/careers`
    },
    {
      title: "ATS of Resume",
      description: "Get a detailed analysis of your resume and how it matches with the job description",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z"/>
          <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z"/>
        </svg>
      ),
      route: `/dashboard/${resumeId}/atsrecord`
    },
    {
      title: "Search for jobs",
      description: "Select your desired career path and get a personalized roadmap",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      ),
      route: `/dashboard/${resumeId}/jobsearch`
    }
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-full bg-blue-600/10 blur-xl pointer-events-none"></div>
      <div className="absolute -top-5 -right-5 h-32 w-32 rounded-full bg-blue-600/10 blur-xl pointer-events-none"></div>

      {/* Header Section */}
      <Card className="bg-gray-900/80 p-8 rounded-3xl shadow-2xl mb-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold mb-4">
            Career Path Selection
          </CardTitle>
          <CardDescription className="text-lg text-gray-300 max-w-2xl mx-auto">
            We are here to help you choose the best career path for you.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        {actionCards.map((card, index) => (
          <Card 
            key={index}
            className="bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 h-full flex flex-col"
          >
            <CardHeader className="flex flex-col gap-3 flex-grow">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600/20 p-2 rounded-lg">
                  {card.icon}
                </div>
                <CardTitle>{card.title}</CardTitle>
              </div>
              <CardDescription className="text-sm text-gray-400 flex-grow">
                {card.description}
              </CardDescription>
              <Link 
                href={card.route}
                className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-center"
              >
                Get Started
              </Link>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Additional Resources Section */}
     
    </div>
  );
}