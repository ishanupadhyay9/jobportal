import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { getAiJobs } from '../../services/apicalls/jobApi';
import { useSelector } from 'react-redux';

const AiJobs = () => {
  const [jobs, setJobs] = useState([]);
    const userId = useSelector(state => state.auth.userId);
  const token = useSelector(state => state.auth.token);
  useEffect(() => {
    async function getData() {
      const data = await getAiJobs(userId,token);
      console.log(data);
      if (data.success) {
        setJobs(data.data);
      }
    }
    
    getData();
  }, []);

  return (
    <section
      className="relative py-16 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0f23 0%, #1b2333 60%, #0a0f23 100%)' }}
    >
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-purple-700/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-800/20 rounded-full blur-3xl animate-blob delay-2000"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-2xl animate-blob delay-4000"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16">
          AI Job Suggestions
        </h1>

        <div className="ai-jobs-grid">
          {jobs.map(job => (
            <JobCard
              key={job.job_id}
              jobId={job.job_id}
              companyName={job.org}
              companyLogo={job.org_avatar}
              jobTitle={job.title}
              lastDate={job.terminate_at}
              onViewDetails={() => console.log(`View ${job.job_id}`)}
            />
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-300 text-lg">No AI job suggestions available at the moment.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .ai-jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          justify-items: center;
          max-width: 100%;
        }

        /* Mobile: 1 column */
        @media (max-width: 640px) {
          .ai-jobs-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 0 0.5rem;
          }
        }

        /* Small tablets: 2 columns */
        @media (min-width: 641px) and (max-width: 900px) {
          .ai-jobs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.75rem;
          }
        }

        /* Medium screens: 3 columns */
        @media (min-width: 901px) and (max-width: 1200px) {
          .ai-jobs-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
        }

        /* Large screens: 4 columns (perfect for 8-10 items in 2-3 rows) */
        @media (min-width: 1201px) and (max-width: 1400px) {
          .ai-jobs-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
          }
        }

        /* Extra large screens: 5 columns (perfect for 10 items in 2 rows) */
        @media (min-width: 1401px) {
          .ai-jobs-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 2.25rem;
          }
        }

        /* Blob animations */
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

export default AiJobs;
