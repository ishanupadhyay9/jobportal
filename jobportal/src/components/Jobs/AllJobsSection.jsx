import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import JobCard from './JobCard';

const AllJobsSection = () => {
  const perPage = 12;
  const jobs = [
    { id: 1, companyName: "Google", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", jobTitle: "Senior Frontend Developer", lastDate: "March 15, 2025" },
    { id: 2, companyName: "Microsoft", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", jobTitle: "Cloud Solutions Architect", lastDate: "March 20, 2025" },
    { id: 3, companyName: "Apple", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", jobTitle: "iOS App Developer", lastDate: "March 18, 2025" },
    { id: 4, companyName: "Netflix", companyLogo: "https://logoeps.com/wp-content/uploads/2013/03/netflix-vector-logo.png", jobTitle: "Data Scientist", lastDate: "March 25, 2025" },
    { id: 5, companyName: "Tesla", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg", jobTitle: "Software Engineer - Autopilot", lastDate: "March 22, 2025" },
    { id: 6, companyName: "Meta", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", jobTitle: "Product Manager", lastDate: "March 28, 2025" },
    { id: 7, companyName: "Amazon", companyLogo: "https://logoeps.com/wp-content/uploads/2012/09/amazon-vector-logo.png", jobTitle: "DevOps Engineer", lastDate: "March 30, 2025" },
    { id: 8, companyName: "Spotify", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg", jobTitle: "Backend Developer", lastDate: "April 2, 2025" },
    { id: 9, companyName: "Adobe", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png", jobTitle: "UX/UI Designer", lastDate: "April 5, 2025" },
    { id: 10, companyName: "Uber", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", jobTitle: "Machine Learning Engineer", lastDate: "April 8, 2025" },
    { id: 11, companyName: "LinkedIn", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png", jobTitle: "Full Stack Developer", lastDate: "April 10, 2025" },
    { id: 12, companyName: "Airbnb", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg", jobTitle: "Product Designer", lastDate: "April 12, 2025" },
    { id: 13, companyName: "Dropbox", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg", jobTitle: "Site Reliability Engineer", lastDate: "April 15, 2025" },
    { id: 14, companyName: "Slack", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg", jobTitle: "Security Engineer", lastDate: "April 18, 2025" }
  ];
  const pages = Math.max(1, Math.ceil(jobs.length / perPage));
  const [page, setPage] = useState(0);

  const start = page * perPage;
  const visibleJobs = jobs.slice(start, start + perPage);

  return (
    <section
      className="relative py-16 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0f23 0%, #1b2333 60%, #0a0f23 100%)' }}
    >
      {/* Artistic Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-purple-700/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-800/20 rounded-full blur-3xl animate-blob delay-2000"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-2xl animate-blob delay-4000"></div>

      {/* Grid of JobCards */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12">
          All Jobs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
          {visibleJobs.map(job => (
            <JobCard
              key={job.id}
              companyName={job.companyName}
              companyLogo={job.companyLogo}
              jobTitle={job.jobTitle}
              lastDate={job.lastDate}
              onViewDetails={() => console.log(`View ${job.id}`)}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-6 mt-8">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 0))}
            disabled={page === 0}
            className={`flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full transition ${
              page === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaChevronLeft /> Previous
          </button>
          <span className="text-gray-300">
            Page {page + 1} of {pages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, pages - 1))}
            disabled={page >= pages - 1}
            className={`flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition ${
              page >= pages - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Blob Animation CSS */}
      <style jsx>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default AllJobsSection;
