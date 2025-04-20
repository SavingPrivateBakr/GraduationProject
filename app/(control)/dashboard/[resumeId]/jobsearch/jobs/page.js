'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { joblist } from '@/actions/cvs';

function cleanJobDescription(description) {
    // Remove HTML tags and &nbsp;
    let cleanText = description.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
    
    // Normalize whitespace and trim
    cleanText = cleanText.replace(/\s+/g, ' ').trim();
    
    // Capitalize first letter
    cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
    
    // Fix punctuation spacing
    cleanText = cleanText.replace(/\s+([,.])/g, '$1');
    
    return cleanText;
  }


const JobsPage = ( ) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  
  const jobType = searchParams.get('jobType');
  const location = searchParams.get('location');

  useEffect(() => {
    // Simulate API call with fake data
    const fetchJobs = async () => {
      
      try {
        const response= await joblist(jobType, location);
        console.log(response.jobs.data.jobs[0]);

        setJobs(response.jobs.data.jobs);
      } catch (error) {
        setError('Failed to load jobs data');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-8 max-w-6xl text-white text-center">
        <div className="animate-pulse text-xl">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 max-w-6xl text-white text-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl text-white">
      <div className="mb-8">
        <h1 className="text-3xl text-center font-bold mb-2">Job Opportunities</h1>
        <p className="text-gray-400 text-center">Found {jobs.length} matching jobs</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job, index) => (
          <div 
            key={index} 
            className="bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">{job.title}</h2>
                <div className="flex items-center gap-3 text-sm text-gray-300 mb-2">
                  <span>{job.company}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                </div>
                <p className="text-gray-400 line-clamp-2">
                  {cleanJobDescription(job.description)}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500 mb-2">
                  Posted: {new Date(job.datePosted).toLocaleDateString()}
                </span>
                <a 
                  href={job.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                >
                  View Job
                </a>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-700/50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">
                  Source: {job.source}
                </span>
                <span className={`px-3 py-1 rounded-full ${
                  job.salary === 'salary not available' 
                    ? 'bg-gray-700/50 text-gray-400' 
                    : 'bg-green-500/20 text-green-300'
                }`}>
                  {job.salary}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-400">No jobs found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default JobsPage;