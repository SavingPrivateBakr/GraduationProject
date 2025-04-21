'use client';
import React, { use, useEffect, useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/cards/cardcopied";
import { atsanalysis } from '@/actions/cvs';
import { useSearchParams } from 'next/navigation';
const getScoreColor = (score) => {
  if (score >= 90) return 'bg-emerald-500 text-white';
  if (score >= 70) return 'bg-blue-500 text-white';
  if (score >= 50) return 'bg-amber-500 text-white';
  return 'bg-red-400 text-white';
};

const ResumeWorth = ({ params,
  atsScore, 
  jobMatch, 
  structure, 
  detailedFeedback 
}) => {

  const [atsdata,setatsdata] = useState([]);

  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { resumeId } = React.use(params);
    const jobDescription =  window.history.state;


      
  

      useEffect(() => { 
      const  fetchasts = async () => {
            try {
             
              const response = await atsanalysis(resumeId,jobDescription);
        
              setatsdata(response.atsresult.data);
          
              
            } catch (error) {
              setError("Failed to load jobs data");
            } finally {
              setLoading(false);
            }
          };

        fetchasts()
      }, []);


   

      detailedFeedback = atsdata.detailedFeedback;
      atsScore = atsdata.atsScore;
      jobMatch = atsdata.jobMatch;
      structure = atsdata.structure;
      
  const [isScoresExpanded, setIsScoresExpanded] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

   
  const renderScore = (score) => (
    <div className={`px-4 py-2 text-xl font-bold rounded-xl text-center ${getScoreColor(score)} shadow-md`}>
      {score}%
    </div>
  );

  const toggleScores = () => setIsScoresExpanded(!isScoresExpanded);
  const toggleDetails = () => setIsDetailsExpanded(!isDetailsExpanded);


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
    <div className="container mx-auto p-4 md:p-8 max-w-6xl text-white relative overflow-hidden">
      {/* Background elements - moved outside of interactive components */}
      <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-full bg-blue-600/10 blur-xl pointer-events-none"></div>
      <div className="absolute -top-5 -right-5 h-32 w-32 rounded-full bg-blue-600/10 blur-xl pointer-events-none"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        {/* ATS Score Card */}
        <Card className="bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
          <CardHeader className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600/20 p-2 rounded-lg transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <CardTitle>ATS Score</CardTitle>
              </div>
              <button 
                onClick={toggleScores} 
                className="text-xl text-blue-400 hover:text-blue-300 transition-colors p-1 rounded-full hover:bg-blue-900/20"
                aria-label="Toggle details"
              >
                {isScoresExpanded ? <MdExpandLess /> : <MdExpandMore />}
              </button>
            </div>
            <CardDescription className="text-sm text-gray-400">
              How well your resume performs with ATS systems
            </CardDescription>
            <div className="flex justify-between items-center mt-2">
              {renderScore(atsScore.overall)}
              <span className="text-xs text-gray-500">Format: {atsScore.formatScore}%</span>
            </div>
          </CardHeader>
          <CardContent className={`${isScoresExpanded ? 'block' : 'hidden'} mt-4 space-y-4`}>
            <div className="bg-gray-700/50 rounded-xl p-4">
              <h4 className="font-semibold text-blue-300 mb-2">Keywords Found ({atsScore.keywords.length})</h4>
              <div className="flex flex-wrap gap-2">
                {atsScore.keywords.map((keyword, index) => (
                  <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            {atsScore.missingKeywords.length > 0 && (
              <div className="bg-gray-700/50 rounded-xl p-4">
                <h4 className="font-semibold text-amber-300 mb-2">Missing Keywords ({atsScore.missingKeywords.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {atsScore.missingKeywords.map((keyword, index) => (
                    <span key={index} className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Job Match Card */}
        <Card className="bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
          <CardHeader className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600/20 p-2 rounded-lg transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <CardTitle>Job Match</CardTitle>
              </div>
              <button 
                onClick={toggleScores} 
                className="text-xl text-blue-400 hover:text-blue-300 transition-colors p-1 rounded-full hover:bg-blue-900/20"
                aria-label="Toggle details"
              >
                {isScoresExpanded ? <MdExpandLess /> : <MdExpandMore />}
              </button>
            </div>
            <CardDescription className="text-sm text-gray-400">
              How well your skills match the job requirements
            </CardDescription>
            <div className="flex justify-between items-center mt-2">
              {renderScore(jobMatch.score)}
              <span className="text-xs text-gray-500">Relevance: {jobMatch.relevance}%</span>
            </div>
          </CardHeader>
          <CardContent className={`${isScoresExpanded ? 'block' : 'hidden'} mt-4 space-y-4`}>
            <div className="bg-gray-700/50 rounded-xl p-4">
              <h4 className="font-semibold text-emerald-300 mb-2">Matching Skills ({jobMatch.matchingSkills.length})</h4>
              <div className="flex flex-wrap gap-2">
                {jobMatch.matchingSkills.map((skill, index) => (
                  <span key={index} className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {jobMatch.missingSkills.length > 0 && (
              <div className="bg-gray-700/50 rounded-xl p-4">
                <h4 className="font-semibold text-amber-300 mb-2">Missing Skills ({jobMatch.missingSkills.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {jobMatch.missingSkills.map((skill, index) => (
                    <span key={index} className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resume Structure Card */}
        <Card className="bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
          <CardHeader className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600/20 p-2 rounded-lg transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <CardTitle>Resume Structure</CardTitle>
              </div>
              <button 
                onClick={toggleScores} 
                className="text-xl text-blue-400 hover:text-blue-300 transition-colors p-1 rounded-full hover:bg-blue-900/20"
                aria-label="Toggle details"
              >
                {isScoresExpanded ? <MdExpandLess /> : <MdExpandMore />}
              </button>
            </div>
            <CardDescription className="text-sm text-gray-400">
              How well your resume is organized
            </CardDescription>
            <div className="flex justify-between items-center mt-2">
              {renderScore(structure.completeness )}
              <span className="text-xs text-gray-500">Readability: {structure.readability }%</span>
            </div>
          </CardHeader>
          <CardContent className={`${isScoresExpanded ? 'block' : 'hidden'} mt-4 space-y-4`}>
            <div className="bg-gray-700/50 rounded-xl p-4">
              <h4 className="font-semibold text-teal-300 mb-2">Present Sections</h4>
              <div className="flex flex-wrap gap-2">
                {structure.sectionsPresent.map((section, index) => (
                  <span key={index} className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-sm">
                    {section}
                  </span>
                ))}
              </div>
            </div>
            {structure.sectionsMissing.length > 0 && (
              <div className="bg-gray-700/50 rounded-xl p-4">
                <h4 className="font-semibold text-amber-300 mb-2">Missing Sections ({structure.sectionsMissing.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {structure.sectionsMissing.map((section, index) => (
                    <span key={index} className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-sm">
                      {section}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis Card */}
      <Card className="bg-gray-900 p-8 rounded-3xl shadow-2xl mt-10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 relative z-10">
        <CardHeader 
          onClick={toggleDetails} 
          className="flex flex-col md:flex-row text-white justify-between items-start md:items-center gap-4 cursor-pointer"
        >
          <div className="flex flex-col gap-2">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <span className="bg-blue-600/20 p-2 rounded-xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              Detailed Analysis
              {renderScore((detailedFeedback.overallScore || Math.round(
          (atsScore.overall + jobMatch.score*3 + structure.completeness) / 5
        )))}
            </CardTitle>
            <CardDescription className="text-sm text-gray-400 max-w-2xl">
              {detailedFeedback.summary}
            </CardDescription>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleDetails();
            }} 
            className="text-2xl text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-blue-900/20"
          >
            {isDetailsExpanded ? <MdExpandLess /> : <MdExpandMore />}
          </button>
        </CardHeader>

        <CardContent className={`${isDetailsExpanded ? 'block' : 'hidden'} mt-8 transition-all duration-500`}>
          <div className="flex flex-col md:flex-row justify-center items-start gap-6 text-white">
            {[
              { 
                title: "Strengths", 
                items: detailedFeedback.strengths, 
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>,
                bg: "from-blue-900/80 to-blue-800/90"
              },
              { 
                title: "Areas for Improvement", 
                items: detailedFeedback.weaknesses, 
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>,
                bg: "from-blue-900/80 to-blue-800/90"
              },
              { 
                title: "Action Items", 
                items: detailedFeedback.actionItems, 
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>,
                bg: "from-blue-900/80 to-blue-800/90"
              }
            ].map((section, index) => (
              <div 
                key={index}
                className={`flex flex-col w-full md:w-1/3 bg-gradient-to-br ${section.bg} rounded-2xl p-6 shadow-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300`}
              >
                <div className="flex items-center justify-center gap-2 mb-5">
                  <div className="bg-blue-600/30 p-2 rounded-lg">
                    {section.icon}
                  </div>
                  <h4 className="text-lg font-bold text-center text-blue-100 uppercase tracking-wider">
                    {section.title}
                  </h4>
                </div>
                <div className="flex flex-col gap-3">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-black/20 rounded-xl p-4 text-center text-gray-200 hover:bg-blue-900/40 transition-all duration-300 relative overflow-hidden"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeWorth;