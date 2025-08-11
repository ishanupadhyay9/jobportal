import React, { useState } from 'react'

const ProfileSetter = () => {
  const [formData, setFormData] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    undergradCourse: "",
    undergradCGPA: "",
    undergradInstitute: "",
    postgradCourse: "",
    postgradCGPA: "",
    postgradInstitute: "",
    resume: null
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("");

  // Course options
  const undergraduateCourses = [
    "B.Tech (Bachelor of Technology)",
    "B.E (Bachelor of Engineering)", 
    "B.Sc (Bachelor of Science)",
    "BCA (Bachelor of Computer Applications)",
    "B.Com (Bachelor of Commerce)",
    "BBA (Bachelor of Business Administration)",
    "B.A (Bachelor of Arts)",
    "MBBS (Bachelor of Medicine and Bachelor of Surgery)",
    "BDS (Bachelor of Dental Surgery)",
    "B.Pharm (Bachelor of Pharmacy)",
    "B.Arch (Bachelor of Architecture)",
    "LLB (Bachelor of Laws)",
    "B.Ed (Bachelor of Education)",
    "BFA (Bachelor of Fine Arts)",
    "B.Des (Bachelor of Design)",
    "Other"
  ];

  const postgraduateCourses = [
    "M.Tech (Master of Technology)",
    "M.E (Master of Engineering)",
    "M.Sc (Master of Science)", 
    "MCA (Master of Computer Applications)",
    "MBA (Master of Business Administration)",
    "M.Com (Master of Commerce)",
    "M.A (Master of Arts)",
    "MS (Master of Science)",
    "M.Pharm (Master of Pharmacy)",
    "M.Arch (Master of Architecture)",
    "LLM (Master of Laws)",
    "M.Ed (Master of Education)",
    "MFA (Master of Fine Arts)",
    "M.Des (Master of Design)",
    "MD (Doctor of Medicine)",
    "MS (Master of Surgery)",
    "MDS (Master of Dental Surgery)",
    "PhD (Doctor of Philosophy)",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onload = (e) => setProfilePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
      setResumeFileName(file.name);
    }
  };

  const removeResume = () => {
    setFormData(prev => ({ ...prev, resume: null }));
    setResumeFileName("");
    // Clear the file input
    const fileInput = document.querySelector('input[name="resume"]');
    if (fileInput) fileInput.value = '';
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'ppt':
      case 'pptx':
        return (
          <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
   <div>
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 w-[100%]">
      <div className="card bg-base-200 w-full shadow-xl">
        <div className="flex card-body justify-center ml-[50px] overflow-x-scroll items-center p-6 sm:p-8 rounded-md w-[1000px]" data-theme={'light'}>
          <div className="w-full max-w-4xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-gray-300">
                    {profilePreview ? (
                      <img 
                        src={profilePreview} 
                        alt="Profile Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                  Change Profile Picture
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Personal Information Section */}
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter your last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Location Information Section */}
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Location Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter your city"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter your state"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter your country"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Academic Information</h2>
                
                {/* High School */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-600 mb-3">High School</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        10th Standard Percentage
                      </label>
                      <input
                        type="number"
                        name="tenthPercentage"
                        value={formData.tenthPercentage}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Enter percentage (0-100)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        12th Standard Percentage
                      </label>
                      <input
                        type="number"
                        name="twelfthPercentage"
                        value={formData.twelfthPercentage}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Enter percentage (0-100)"
                      />
                    </div>
                  </div>
                </div>

                {/* Undergraduate */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-600 mb-3">Undergraduate</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Undergraduate Course *
                      </label>
                      <select
                        name="undergradCourse"
                        value={formData.undergradCourse}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                      >
                        <option value="">Select Course</option>
                        {undergraduateCourses.map((course, index) => (
                          <option key={index} value={course}>
                            {course}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Undergraduate CGPA
                      </label>
                      <input
                        type="number"
                        name="undergradCGPA"
                        value={formData.undergradCGPA}
                        onChange={handleInputChange}
                        min="0"
                        max="10"
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Enter CGPA (0-10)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Undergraduate Institute
                      </label>
                      <input
                        type="text"
                        name="undergradInstitute"
                        value={formData.undergradInstitute}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Enter institute name"
                      />
                    </div>
                  </div>
                </div>

                {/* Postgraduate */}
                <div>
                  <h3 className="text-lg font-medium text-gray-600 mb-3">Postgraduate</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postgraduate Course
                      </label>
                      <select
                        name="postgradCourse"
                        value={formData.postgradCourse}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                      >
                        <option value="">Select Course</option>
                        {postgraduateCourses.map((course, index) => (
                          <option key={index} value={course}>
                            {course}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postgraduate CGPA
                      </label>
                      <input
                        type="number"
                        name="postgradCGPA"
                        value={formData.postgradCGPA}
                        onChange={handleInputChange}
                        min="0"
                        max="10"
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Enter CGPA (0-10)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postgraduate Institute
                      </label>
                      <input
                        type="text"
                        name="postgradInstitute"
                        value={formData.postgradInstitute}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Enter institute name"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Upload Section */}
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Resume</h2>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Upload your resume in PDF, Word (.doc/.docx), or PowerPoint (.ppt/.pptx) format
                  </p>
                  
                  {!resumeFileName ? (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors duration-200">
                      <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                      </svg>
                      <label className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                        Choose Resume File
                        <input
                          type="file"
                          name="resume"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          onChange={handleResumeChange}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Supported formats: PDF, DOC, DOCX, PPT, PPTX (Max size: 10MB)
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(resumeFileName)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{resumeFileName}</p>
                          <p className="text-xs text-gray-500">
                            {formData.resume ? `${(formData.resume.size / 1024 / 1024).toFixed(2)} MB` : ''}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeResume}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-12 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProfileSetter
