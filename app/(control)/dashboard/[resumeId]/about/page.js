"use client";
import React from "react";
import ActionCard from "@/components/cards/actioncard"
import useAppContext from "@/hooks/useAppContext";
import{useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
export default function Decision({params}) {

  const {resumeList, setResumeData, getResumeWithId, resumeData,syncResumeData} = useAppContext();
  
  const { resumeId } =  params;
  
  
  if(resumeData == null)
  {
 
     getResumeWithId(resumeId);   
 }

  
  
    return (
        <div className="mt-52 flex flex-wrap gap-6 justify-center w-5/6 h-full ">
          <div className="text-center mb-16">
           
            <h2 className="font-roboto text-xl md:text-2xl text-[#a3a3a3] max-w-2xl">
              
            We are here to help you choose the best career path for you.
            </h2>
          </div>
     
          
          <div className="flex flex-col md:flex-row gap-6 justify-center h-full max-w-fit ">
            
            <ActionCard
              title="AI Career Recommendation"
              description="Let AI suggest the best career path based on your skills and experience"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              }
              route={`/dashboard/${resumeId}/careers`}
            />
            
       <ActionCard
              title="Ats of Resume"
              description="Get a detailed analysis of your resume and how it matches with the job description"
              icon={
                <svg  xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6">
                <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z"/>
                <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z"/>
              </svg>
              
              }
              route={`/dashboard/${resumeId}/atsrecord`}
            />
          
            <ActionCard
              title="Search for jobs"
              description="Select your desired career path and get a personalized roadmap"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
              }
              route={`/dashboard/${resumeId}/jobsearch`}
            />
         
          </div>
        </div>
      );
}
