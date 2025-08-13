import React from 'react'
import Jobcard from '../Jobcard';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const Postedjobs = () => {

    const jobData = [
    {
      companyName: "Microsoft",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      jobTitle: "Software Engineer",
      description: "Join Microsoft as a software engineer."
    },
    {
      companyName: "Google",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      jobTitle: "Frontend Developer",
      description: "Work on Google's front-end applications."
    },
    {
      companyName: "Apple",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      jobTitle: "iOS Developer",
      description: "Join Apple's mobile development team."
    },
    {
      companyName: "Amazon",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      jobTitle: "Cloud Architect",
      description: "Work with AWS services at Amazon."
    },
    {
      companyName: "Netflix",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
      jobTitle: "Backend Engineer",
      description: "Join Netflix backend infrastructure team."
    },
    {
      companyName: "Tesla",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
      jobTitle: "Electrical Engineer",
      description: "Work on electric vehicle systems at Tesla."
    },
    {
      // Example with no props → defaults will be used
    }
  ];

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 6;

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + visibleCount, jobData.length - visibleCount)
    );
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };



const companyName = "Microsoft";
  const companyLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg";

  return (
    <div className='w-full h-full relative'>
        <div className="max-w-4xl  left-3 mx-auto p-6 bg-white w-[90%] mt-3 h-[159px] rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">All Jobs Posting</h1>
      
      <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow">
        <img
          src={companyLogoUrl}
          alt={`${companyName} Logo`}
          className="w-10 h-10 object-contain"
        />
        <span className="text-xl font-semibold text-gray-800">{companyName}</span>
      </div>
    </div>


     <div className=" m-6 p-6 rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Active Job Postings</h1>

      <div className="flex items-center">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="px-4 py-4 bg-blue-500 shadow rounded-full mr-4 hover:bg-gray-200 hover:text-black transition disabled:opacity-50"
        >
          <FaArrowLeft />

        </button>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4 flex-1">
          {jobData
            .slice(startIndex, startIndex + visibleCount)
            .map((job, index) => (
              <Jobcard
                key={index + startIndex}
                companyName={job.companyName}
                companyLogo={job.companyLogo}
                jobTitle={job.jobTitle}
                description={job.description}
                buttonText={job.buttonText}
              />
            ))}
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          disabled={startIndex + visibleCount >= jobData.length}
          className="px-4 py-4  bg-blue-500   rounded-full ml-4 hover:bg-gray-200 hover:text-black transition disabled:opacity-50"
        >
          <FaArrowRight/>
        </button>
      </div>
    </div>

      <div className=" m-6 p-6 rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Completed Job Postings</h1>

      <div className="flex items-center">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="px-4 py-4 bg-blue-500 shadow rounded-full mr-4 hover:bg-gray-200 hover:text-black transition disabled:opacity-50"
        >
          <FaArrowLeft />

        </button>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4 flex-1">
          {jobData
            .slice(startIndex, startIndex + visibleCount)
            .map((job, index) => (
              <Jobcard
                key={index + startIndex}
                companyName={job.companyName}
                companyLogo={job.companyLogo}
                jobTitle={job.jobTitle}
                description={job.description}
                buttonText={"Results"}
              />
            ))}
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          disabled={startIndex + visibleCount >= jobData.length}
          className="px-4 py-4  bg-blue-500   rounded-full ml-4 hover:bg-gray-200 hover:text-black transition disabled:opacity-50"
        >
          <FaArrowRight/>
        </button>
      </div>
    </div>
    </div>
  );
}

export default Postedjobs
