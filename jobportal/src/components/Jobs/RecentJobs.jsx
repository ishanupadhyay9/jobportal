import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { getRecentJobs } from '../../services/apicalls/jobApi';
import { useSelector } from 'react-redux';
const RecentJobs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4;

  // 8 popular jobs data
  const [popularJobs,setPopularJobs]= useState([]);
  const token = useSelector((state)=>state.auth.token);
  useEffect(()=>{
    async function getpj(){
      const data = await getRecentJobs(token);
      console.log(data);
      setPopularJobs(data.data);
    }

    if(token){getpj();}
  },[token])
  
  const maxIndex = popularJobs.length - cardsPerView;

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  // Visible slice
  const visibleJobs = popularJobs.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section className=" mt-20 py-16 px-6 relative" style={{ background: '#f1f3f5' }}>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Recent Jobs
      </h2>
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)` }}
        >
          {popularJobs.map(job => (
            <div key={job.id} className="flex-shrink-0 w-1/4 px-2">
              <JobCard
                key={job.job_id}
                 jobId={job.job_id}
              companyName={job.org}
              companyLogo={job.org_avatar}
              jobTitle={job.title}
              lastDate={job.terminate_at}
                onViewDetails={() => console.log(`View ${job.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentJobs;
