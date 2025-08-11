import React, { useState, useRef } from 'react';

const EmployerProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    country: '',
    organizationName: '',
    gender: ''
  });

  const [logoPreview, setLogoPreview] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const fileInputRef = useRef(null);

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateFile = (file) => {
    const maxFileSize = 5242880; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!file) return { isValid: false, message: 'Please select a file.' };
    
    if (!allowedTypes.includes(file.type)) {
      return { 
        isValid: false, 
        message: 'Please select a valid image file (JPEG, PNG, GIF, WebP).' 
      };
    }
    
    if (file.size > maxFileSize) {
      return { 
        isValid: false, 
        message: 'File size must be less than 5MB.' 
      };
    }
    
    return { isValid: true, message: '' };
  };

  const handleSelectLogo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setUploadMessage('');

    if (!file) return;

    const validation = validateFile(file);
    
    if (!validation.isValid) {
      setUploadMessage(validation.message);
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setLogoPreview(base64);
      setLogoFile(file);
      setUploadMessage('Logo uploaded successfully!');
    } catch (error) {
      setUploadMessage('Error uploading file. Please try again.');
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleRemoveLogo = () => {
    setLogoPreview('');
    setLogoFile(null);
    setUploadMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Handle save logic here
    console.log('Form Data:', formData);
    console.log('Logo File:', logoFile);
    alert('Profile saved successfully!');
  };

  return (
    <div className="max-w-6xl w-[1000px] mx-auto p-8 bg-white rounded-2xl mt-5">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2 text-center">Employer Profile</h1>
      </div>

      <form className="space-y-8" onSubmit={handleSave}>
        {/* Organization Information Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg border">
          <h2 className="text-2xl font-semibold text-black mb-6">Organization Information</h2>
          
          <div className="mb-8">
            <label htmlFor="organizationName" className="block text-base font-medium text-black mb-2">
              Organization Name
            </label>
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              placeholder="Enter organization name"
              value={formData.organizationName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-black placeholder-opacity-70 text-black"
              required
            />
          </div>

          {/* Organization Logo Section */}
          <div>
            <label className="block text-base font-medium text-black mb-4">
              Organization Logo
            </label>
            
            <div className="flex flex-col items-center space-y-6">
              {/* Logo Preview Area */}
              <div className="w-60 h-60 border-2 border-dashed border-black rounded-lg flex items-center justify-center bg-white">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Organization Logo"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-center text-black">
                    <svg className="mx-auto h-16 w-16 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-base font-medium">No logo selected</p>
                  </div>
                )}
              </div>

              {/* File Upload Controls */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSelectLogo}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 text-base font-medium"
                >
                  Select Logo
                </button>
                
                {logoPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 text-base font-medium"
                  >
                    Remove Logo
                  </button>
                )}
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {/* Upload Message */}
              {uploadMessage && (
                <p className={`text-base font-medium ${uploadMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                  {uploadMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg border">
          <h2 className="text-2xl font-semibold text-black mb-6">Personal Information</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-base font-medium text-black mb-2">
                Employer First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-black placeholder-opacity-70 text-black"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-base font-medium text-black mb-2">
                Employer Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-black placeholder-opacity-70 text-black"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-base font-medium text-black mb-2">
              Employer Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              required
            >
              <option value="" className="text-black">Select Gender</option>
              {genderOptions.map(option => (
                <option key={option} value={option} className="text-black">{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Location Information Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg border">
          <h2 className="text-2xl font-semibold text-black mb-6">Location Information</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="city" className="block text-base font-medium text-black mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-black placeholder-opacity-70 text-black"
                required
              />
            </div>
            
            <div>
              <label htmlFor="state" className="block text-base font-medium text-black mb-2">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-black placeholder-opacity-70 text-black"
                required
              />
            </div>
            
            <div>
              <label htmlFor="country" className="block text-base font-medium text-black mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-black placeholder-opacity-70 text-black"
                required
              />
            </div>
          </div>
        </div>

        
        {/* Save Button */}
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
  );
};

export default EmployerProfile;
