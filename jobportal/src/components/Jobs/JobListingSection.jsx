import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';

const PopularJobsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4;

  // 8 popular jobs data
  const popularJobs = [
    { id: 1, companyName: "Google", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", jobTitle: "Senior Frontend Developer", lastDate: "March 15, 2025" },
    { id: 2, companyName: "Microsoft", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", jobTitle: "Cloud Solutions Architect", lastDate: "March 20, 2025" },
    { id: 3, companyName: "Apple", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", jobTitle: "iOS App Developer", lastDate: "March 18, 2025" },
    { id: 4, companyName: "Netflix", companyLogo: "https://logoeps.com/wp-content/uploads/2013/03/netflix-vector-logo.png", jobTitle: "Data Scientist", lastDate: "March 25, 2025" },
    { id: 5, companyName: "Tesla", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg", jobTitle: "Software Engineer - Autopilot", lastDate: "March 22, 2025" },
    { id: 6, companyName: "Meta", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", jobTitle: "Product Manager", lastDate: "March 28, 2025" },
    { id: 7, companyName: "Amazon", companyLogo: "https://logoeps.com/wp-content/uploads/2012/09/amazon-vector-logo.png", jobTitle: "DevOps Engineer", lastDate: "March 30, 2025" },
    { id: 8, companyName: "Spotify", companyLogo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg", jobTitle: "Backend Developer", lastDate: "April 2, 2025" }
  ];
  
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
    <section className="py-16 px-6 relative" style={{ background: '#f1f3f5' }}>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Popular Jobs
      </h2>
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)` }}
        >
          {popularJobs.map(job => (
            <div key={job.id} className="flex-shrink-0 w-1/4 px-2">
              <JobCard
                companyName={job.companyName}
                companyLogo={job.companyLogo}
                jobTitle={job.jobTitle}
                lastDate={job.lastDate}
                onViewDetails={() => console.log(`View ${job.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularJobsSection;
