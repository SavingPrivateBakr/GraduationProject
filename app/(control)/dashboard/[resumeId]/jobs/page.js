'use client';
import React, { useState, useEffect } from 'react';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call with fake data
    const fetchJobs = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const fakeJobsData = {
          status: "success",
          data: {
            total: 6,
            jobs: [
              {
                title: "Senior Backend Engineer - PHP & Laravel",
                company: "Tagaddod",
                location: "Cairo, Egypt",
                description: "Tagaddod is seeking an experienced Senior Backend Engineer to join our growing team. You'll be responsible for developing and maintaining our core platform using PHP and Laravel. The ideal candidate has 5+ years of experience with scalable backend systems.",
                salary: "EGP 25,000 - 35,000/month",
                source: "swooped.co",
                url: "https://jooble.org/jdp/-1636880046911286466",
                datePosted: "2025-02-17T14:01:38.9930000"
              },
              {
                title: "Software Engineer - Backend (PHP)",
                company: "Areeb Technology",
                location: "Alexandria, Egypt",
                description: "We are seeking a skilled and experienced Backend Software Engineer to work on our enterprise solutions. You'll collaborate with frontend developers to integrate user-facing elements with server-side logic.",
                salary: "EGP 18,000 - 28,000/month",
                source: "swooped.co",
                url: "https://jooble.org/jdp/-3570119477082126139",
                datePosted: "2025-02-14T03:26:10.4430000"
              },
              {
                title: "Full Stack Developer (React/PHP)",
                company: "Digital Minds",
                location: "Remote, Egypt",
                description: "Join our team as a Full Stack Developer working with modern React frontends and PHP backends. We're building innovative web applications for international clients.",
                salary: "salary not available",
                source: "swooped.co",
                url: "https://jooble.org/jdp/1234567890123456789",
                datePosted: "2025-02-10T09:15:22.1000000"
              },
              {
                title: "PHP Developer - E-commerce Platform",
                company: "ShopEgy",
                location: "Giza, Egypt",
                description: "Looking for a PHP developer to enhance our e-commerce platform. Experience with Magento or Shopify plugins is a plus. You'll work on performance optimization and new feature development.",
                salary: "EGP 20,000 - 30,000/month",
                source: "swooped.co",
                url: "https://jooble.org/jdp/9876543210987654321",
                datePosted: "2025-02-08T11:45:33.2000000"
              },
              {
                title: "Backend API Developer",
                company: "TechSolutions EG",
                location: "New Cairo, Egypt",
                description: "Develop and maintain RESTful APIs for our mobile and web applications. Strong experience with PHP frameworks and database optimization required.",
                salary: "EGP 22,000 - 32,000/month",
                source: "swooped.co",
                url: "https://jooble.org/jdp/5678901234567890123",
                datePosted: "2025-02-05T16:30:44.3000000"
              },
              {
                title: "WordPress Plugin Developer",
                company: "WebCrafters",
                location: "Mansoura, Egypt",
                description: "Specialized WordPress developer needed to create custom plugins and themes. Must have deep understanding of PHP and WordPress architecture.",
                salary: "EGP 15,000 - 25,000/month",
                source: "swooped.co",
                url: "https://jooble.org/jdp/3456789012345678901",
                datePosted: "2025-02-01T08:20:55.4000000"
              }
            ]
          }
        };

        setJobs(fakeJobsData.data.jobs);
      } catch (err) {
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
                  {job.description}
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