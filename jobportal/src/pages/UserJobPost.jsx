import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import img from "../images/tech.gif";

const UserJobPost = () => {
  const companyLogo = "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg";
  const companyName = "Microsoft";
  const employerName = "John Doe";
  const jobTitle = "Software Engineer";
  const jobDescription = `...`; // (omitted for brevity)
  const min10thPercentage = "85%";
  const min12thPercentage = "80%";
  const lastDateToApply = "2025-09-15";
  const totalApplicants = 45;
  const [applied, setApplied] = useState(false);

  const jobImage = img;

  const calculateDaysRemaining = (lastDate) => {
    const now = new Date();
    const deadline = new Date(lastDate);
    const diff = deadline.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };
  const daysRemaining = calculateDaysRemaining(lastDateToApply);

  const handleApply = () => {
    setApplied(true);
    console.log('Applied for job');
  };

  return (
    <div className="w-full overflow-x-hidden min-h-screen">
      <Navbar />

      <div className="px-4 pt-3 max-w-[1080px] mx-auto">
        <div className="p-4 bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 mt-3">
          <img
            src={companyLogo}
            alt={`${companyName} Logo`}
            className="w-40 h-40 object-contain rounded-lg"
          />
          <h1 className="text-5xl font-extrabold text-gray-900">{companyName}</h1>
          <p className="text-xl text-gray-600">Employer: {employerName}</p>
        </div>

        <div className="flex flex-col lg:flex-row mt-8 justify-between max-w-[1200px] mx-auto space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{jobTitle}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {jobDescription}
            </p>
          </div>

          <div className="flex-shrink-0 w-full lg:w-96 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
              <h3 className="text-lg font-medium text-gray-600 mb-4">
                Eligibility & Enrollment Info
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min 10th Standard Percentage Required
                  </label>
                  <span className="px-4 py-2 rounded-lg text-gray-900 block">
                    {min10thPercentage}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min 12th Standard Percentage Required
                  </label>
                  <span className="px-4 py-2 rounded-lg text-gray-900 block">
                    {min12thPercentage}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64 w-full">
                <img
                  src={jobImage}
                  alt={`${jobTitle} at ${companyName}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h2 className="text-white text-xl font-bold">{jobTitle}</h2>
                  <p className="text-white/90 text-sm">{companyName}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{totalApplicants}</div>
                    <div className="text-sm text-gray-600 mt-1">Total Applicants</div>
                  </div>
                  <div className="text-center bg-orange-50 rounded-lg p-4">
                    <div className="text-sm font-semibold text-orange-600">
                      {new Date(lastDateToApply).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {daysRemaining > 0 ? `${daysRemaining} days left` : 'Deadline passed'}
                    </div>
                    <div className="text-xs text-gray-500">Last Date</div>
                  </div>
                </div>

                <div className="flex justify-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    daysRemaining > 7
                      ? 'bg-green-100 text-green-800'
                      : daysRemaining > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {daysRemaining > 0 ? 'Active' : 'Closed'}
                  </span>
                </div>

                <button
                  onClick={handleApply}
                  disabled={applied || daysRemaining <= 0}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none ${
                    applied
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } ${
                    daysRemaining <= 0 && 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {applied ? '✓ Applied' : 'Apply Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserJobPost;
