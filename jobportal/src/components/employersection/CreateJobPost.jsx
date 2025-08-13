import React, { useState } from 'react';

const CreateJobPost = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    min10thPercentage: '',
    min12thPercentage: '',
    lastDateToApply: ''
  });

  // Example organization data (can come from props or API)
  const organizationName = "Tech Solutions Pvt Ltd";
  const organizationLogo =
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"; // placeholder
  const employerName = "John Doe";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveJob = (e) => {
    e.preventDefault();
    console.log("Job Posting Data:", formData);
    alert("Job posted successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white mt-3 rounded-xl mb-4">
      {/* Top Section - Organization & Employer */}
      <div className="flex items-center mb-8 bg-white p-6 rounded-lg shadow-lg border">
        <img
          src={organizationLogo}
          alt="Organization Logo"
          className="w-20 h-20 object-contain rounded-lg border border-gray-300 mr-6"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{organizationName}</h2>
          <p className="text-gray-600">Employer: {employerName}</p>
        </div>
      </div>

      {/* Job Posting Form */}
      <form className="space-y-8" onSubmit={handleSaveJob}>
        
        {/* Job Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600 mb-3">Job Details</h3>
            
            <div className="grid grid-cols-1 gap-6">
              
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Enter job title"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             outline-none transition-all duration-200 placeholder-gray-700"
                />
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Enter job requirements & responsibilities"
                  rows="6"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             outline-none transition-all duration-200 placeholder-gray-700"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility & Application Info */}
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600 mb-3">Eligibility & Application Info</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum 10th Std Percentage Required *
                </label>
                <input
                  type="number"
                  name="min10thPercentage"
                  value={formData.min10thPercentage}
                  onChange={handleInputChange}
                  placeholder="Enter percentage"
                  required
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             outline-none transition-all duration-200 placeholder-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum 12th Std Percentage Required *
                </label>
                <input
                  type="number"
                  name="min12thPercentage"
                  value={formData.min12thPercentage}
                  onChange={handleInputChange}
                  placeholder="Enter percentage"
                  required
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             outline-none transition-all duration-200 placeholder-gray-700"
                />
              </div>

    <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Last Date to Apply *
  </label>
  <div
    className="relative flex items-center cursor-pointer"
    onClick={() => document.getElementById('lastDateInput').showPicker?.()}
  >
    <input
      id="lastDateInput"
      type="date"
      name="lastDateToApply"
      value={formData.lastDateToApply}
      onChange={handleInputChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                 outline-none transition-all duration-200 text-gray-900 pr-10 cursor-pointer"
    />
    {/* Calendar Icon - clickable */}
    <div className="absolute inset-y-0 right-3 flex items-center text-black">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 8.25h18M4.5 
             21h15a1.5 1.5 0 001.5-1.5V8.25H3V19.5A1.5 
             1.5 0 004.5 21z"
        />
      </svg>
    </div>
  </div>
</div>





            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold 
                       rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobPost;
