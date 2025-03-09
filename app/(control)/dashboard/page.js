'use client'
import {ResumeList} from "@/components/dashboard/resume-list";
import { useState } from "react";

export default function DashBoardPage() {
 
 

    return (
        <div className={"mx-auto w-full max-w-[1280px]"}>
            {/* Heading */}
            <div className="dbpx pt-4 md:pt-6">
                <div className="flex w-full flex-col items-center">
                    <h1 className="text-white mt-4 text-center text-base font-bold sm:text-lg lg:text-xl">Welcome to your Resume Builder</h1>
                    <h2 className="text-white mt-2 max-w-[15ch] text-center text-4xl font-extrabold sm:mt-[10px] sm:text-6xl md:mt-3 lg:mt-[18px] lg:text-7xl">
                        What do you want to create?
                    </h2>
                </div>
            </div>

            {/* Containers */}
            <div className={""} id={"myResumes"}>
                {/* My Resumes Headers */}
                <div className="dbpx">
                    <h2 className="text-primaryBlack flex items-center justify-between text-xl font-bold sm:text-2xl md:text-3xl text-white lg:text-4xl">
                        My resumes
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 md:mt-1 md:text-base">
                        Your  resume – 100% free, forever, all features, unlimited downloads, yes really.
                    </p>
                </div>

                {/* My Resumes List */}
                <ResumeList className={"mt-4 w-full lg:mt-6"}/>
            </div>
        </div>
    );
}
