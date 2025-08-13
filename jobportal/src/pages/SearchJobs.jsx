import React, { useState, useEffect } from 'react';
import { FaSearch, FaBriefcase, FaStar, FaRocket } from 'react-icons/fa';
import JobCard from '../components/JobCard';
import Navbar from '../components/Navbar';

const sampleJobs = [
  { id: 1, companyName: "Google", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", jobTitle: "Senior Frontend Developer", lastDate: "2025-09-15" },
  { id: 2, companyName: "Microsoft", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", jobTitle: "Cloud Solutions Architect", lastDate: "2025-09-20" },
  { id: 3, companyName: "Apple", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", jobTitle: "iOS App Developer", lastDate: "2025-09-18" },
  { id: 4, companyName: "Netflix", companyLogo: "https://logoeps.com/wp-content/uploads/2013/03/netflix-vector-logo.png", jobTitle: "Data Scientist", lastDate: "2025-09-25" },
  { id: 5, companyName: "Tesla", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg", jobTitle: "Software Engineer - Autopilot", lastDate: "2025-09-22" },
  { id: 6, companyName: "Meta", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", jobTitle: "Product Manager", lastDate: "2025-09-28" },
  { id: 7, companyName: "Amazon", companyLogo: "https://logoeps.com/wp-content/uploads/2012/09/amazon-vector-logo.png", jobTitle: "DevOps Engineer", lastDate: "2025-09-30" },
  { id: 8, companyName: "Spotify", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg", jobTitle: "Backend Developer", lastDate: "2025-10-02" }
];

const SearchJobs = () => {
  const [query, setQuery] = useState('');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const filtered = sampleJobs.filter(job =>
    job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
    job.companyName.toLowerCase().includes(query.toLowerCase())
  );

  return (
  <div>
    <Navbar/>
      <section
      className="relative py-20 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0f23 0%, #1b2333 60%, #0a0f23 100%)'
      }}
    >
      
      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-700/20 rounded-full blur-3xl animate-blob delay-2000"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-2xl animate-blob delay-4000"></div>

      {/* Floating Icons */}
      <FaBriefcase className="absolute animate-float-slow text-blue-400 text-4xl left-8 top-24 opacity-20" />
      <FaStar className="absolute animate-float-slow text-cyan-400 text-3xl right-16 top-40 opacity-20 delay-1000" />
      <FaRocket className="absolute animate-float-slow text-indigo-400 text-5xl left-1/4 bottom-24 opacity-20 delay-2000" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search jobs or companies..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length ? filtered.map((job, idx) => (
            <div
              key={job.id}
              className={`transform transition-all duration-700 ${
                animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <JobCard
                companyName={job.companyName}
                companyLogo={job.companyLogo}
                jobTitle={job.jobTitle}
                lastDate={job.lastDate}
                onViewDetails={() => console.log(`View ${job.id}`)}
              />
            </div>
          )) : (
            <p className="text-center text-gray-400 col-span-full">No jobs found.</p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  </div>
  );
};

export default SearchJobs;
