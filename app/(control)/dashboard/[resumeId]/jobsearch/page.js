'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const Jobsearch = () => {
  const [filters, setFilters] = useState({
    track: 'All Job Types',
    location: 'All Locations'
  });
  const [submittedFilters, setSubmittedFilters] = useState(null);
const router = useRouter();

  const track = [
    'All Job Types',
    'Backend Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'Mobile Developer (iOS/Android)',
    'DevOps Engineer',
    'Data Engineer',
    'Machine Learning Engineer',
    'AI Specialist',
    'QA Engineer',
    'Security Engineer',
    'Embedded Systems Engineer',
    'Cloud Architect',
    'Blockchain Developer',
    'Game Developer',
    'Technical Lead',
    'Engineering Manager',
    'Systems Administrator',
    'Database Administrator',
    'Site Reliability Engineer'
  ];

  const locations = [
    'All Locations',
    'Egypt',
    'United States',
    'United Kingdom',
    'Canada',
    'Germany',
    'France',
    'Netherlands',
    'United Arab Emirates',
    'Saudi Arabia',
    'Qatar',
    'Australia',
    'Japan',
    'Singapore',
    'India',
    'South Africa',
    'Brazil',
    'Remote (Worldwide)',
    'Remote (Region Specific)',
    'Hybrid (Office + Remote)'
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedFilters({
      track: filters.track === 'All Job Types' ? 'All Job Types' : filters.track,
      location: filters.location === 'All Locations' ? 'All Locations' : filters.location

      
    });
    const params = new URLSearchParams({
      jobType: 'Frontend',
      location: 'Remote'
    });

    // Navigate to jobs page with query params
    router.push(`jobsearch/jobs?${params.toString()}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl text-white">
      <div className="mb-8">
        <h1 className="text-3xl text-center font-bold mb-2">Job Opportunities</h1>
        
        {/* Filter Controls */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="flex-1">
              <label htmlFor="track" className="block text-lg font-medium text-gray-300 mb-2">
                Job Type
              </label>
              <select
                id="track"
                name="track"
                value={filters.track}
                onChange={handleFilterChange}
                className="w-full bg-gray-800/80 border-2 border-gray-600 rounded-lg px-6 py-3 text-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500/50 transition-all"
                size="5" 
              >
                {track.map((type, index) => (
                  <option 
                    key={index} 
                    value={type}
                    className="py-2 rounded-l hover:bg-blue-700"
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <label htmlFor="location" className="block text-lg font-medium text-gray-300 mb-2">
                Location
              </label>
              <select
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full bg-gray-800/80 border-2 border-gray-600 rounded-lg px-6 py-3 text-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500/50 transition-all"
                size="5" 
              >
                {locations.map((location, index) => (
                  <option 
                    key={index} 
                    value={location}
                    className="py-2 rounded-l hover:bg-blue-700"
                  >
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-bold transition-colors duration-300 transform hover:scale-105"
            >
              Search Jobs
            </button>
          </div>
        </form>

        
      </div>
    </div>
  );
};

export default Jobsearch;