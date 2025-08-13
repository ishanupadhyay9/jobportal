import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import img from "../images/tech.gif"

const EmployerPost = () => {
  const companyLogo = "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg";
  const companyName = "Microsoft";
  const employerName = "John Doe";
  const jobTitle = "Software Engineer";
  const jobDescription = `
We are seeking a passionate and talented Software Engineer to join our growing team. As part of our core engineering group, you will work on cutting-edge projects that impact millions of users worldwide. This position provides the opportunity to contribute to highly scalable and robust systems, develop efficient code, and collaborate within a cross-functional and dynamic environment.

Responsibilities

As a Software Engineer, you will:
- Design, develop, and maintain web applications, APIs, and services that are highly available and scalable.
- Collaborate closely with product managers, designers, and fellow engineers to deliver features end-to-end, from concept to production.
- Participate in code reviews, mentor junior developers, and help establish best practices in code quality, testing, and documentation.
- Troubleshoot performance and reliability issues, leveraging strong analytic and problem-solving skills.
- Stay up-to-date with the latest technologies, and actively participate in technical discussions to help guide architectural and design decisions.
- Take ownership of assigned modules and products, ensuring timely delivery of high-quality solutions.

What We're Looking For

The ideal candidate will have:
- A Bachelor's or Master's degree in Computer Science, Engineering, or a related field, or equivalent practical experience.
- 2+ years of professional software development experience, preferably in a product-based environment.
- Proficiency in at least one modern programming language such as JavaScript/TypeScript, Python, Java, or Go.
- Solid understanding of web technologies, RESTful APIs, databases (SQL/NoSQL), and cloud platforms (AWS, Azure, or GCP).
- Experience with agile methodologies, source control (Git), and continuous integration/deployment pipelines.
- Strong communication skills and the ability to articulate complex technical concepts to technical and non-technical audiences.

What Sets You Apart

- A passion for learning new technologies and improving existing skills.
- A collaborative mindset, with empathy for both colleagues and end-users.
- An interest in building systems that have meaningful, real-world impact.
- Experience with microservices, containerization (Docker, Kubernetes), or frontend frameworks (React, Angular, Vue) is a plus.
- A proactive approach to identifying opportunities for optimization, automation, and innovation.

Why Join Us?

By joining our team, you will work in a friendly, inclusive, and innovative environment where your input is valued and your growth is supported. We believe in maintaining a healthy work-life balance and encourage personal and professional development. Our company offers competitive compensation, comprehensive benefits, flexible work arrangements, and the chance to work on challenging and rewarding projects with talented professionals.


If you're excited about building exceptional products and eager to take on new challenges in a supportive environment, we would love to hear from you!
`;

  const min10thPercentage = "85%";
  const min12thPercentage = "80%";
  const lastDateToApply = "2025-09-15"; // Added missing variable
  const totalApplicants = 45; // Simplified - no state needed if not updating
  const [shortlisted, setShortlisted] = useState(false);

  // Sample data - you can pass these as props
  const jobImage = img;

  const handleShortlist = () => {
    setShortlisted(!shortlisted);
    console.log(shortlisted ? 'Removed from shortlist' : 'Added to shortlist');
  };

  // Calculate days remaining
  const calculateDaysRemaining = (lastDate) => {
    const currentDate = new Date();
    const deadline = new Date(lastDate);
    const timeDifference = deadline.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysRemaining;
  };

  const daysRemaining = calculateDaysRemaining(lastDateToApply);

  return (
    <div className='w-full overflow-x-hidden min-h-screen'>
      <Navbar/>
      <div className="px-4 pt-3">

        <div className="p-4 bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 mt-3 w-full max-w-[1080px] mx-auto">
          <img
            src={companyLogo}
            alt={`${companyName} Logo`}
            className="w-40 h-40 object-contain rounded-lg"
          />
          <h1 className="text-5xl font-extrabold text-gray-900">{companyName}</h1>
          <p className="text-xl text-gray-600">Employer: {employerName}</p>
        </div>

        <div className='flex flex-col lg:flex-row mt-8 justify-between px-15  max-w-[1200px] mx-auto'>
          <div className="flex-1 max-w-2xl bg-white rounded-xl shadow-lg p-6 border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{jobTitle}</h2>
            <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">{jobDescription}</p>
          </div>

          <div className='flex-shrink-0 w-full lg:w-96 space-y-6'>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
              <h3 className="text-lg font-medium text-gray-600 mb-4">
                Eligibility & Enrollment Info
              </h3>

              <div className="flex flex-col gap-2">
                {/* 10th Percentage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min 10th Standard Percentage Required
                  </label>
                  <span className="w-full px-4 py-2 rounded-lg text-gray-900">
                    {min10thPercentage}
                  </span>
                </div>

                {/* 12th Percentage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min 12th Standard Percentage Required
                  </label>
                  <span className="w-full px-4 py-2 rounded-lg text-gray-900">
                    {min12thPercentage}
                  </span>
                </div>

                {/* Last Date */}
                {/* People Enrolled */}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Large Image Section */}
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

              {/* Information Section */}
              <div className="p-6">
                {/* Applicants and Date Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Total Applicants */}
                  <div className="text-center">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">{totalApplicants}</div>
                      <div className="text-sm text-gray-600 mt-1">Total Applicants</div>
                    </div>
                  </div>

                  {/* Last Date to Apply */}
                  <div className="text-center">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="text-sm font-semibold text-orange-600">
                        {new Date(lastDateToApply).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {daysRemaining > 0 ? `${daysRemaining} days left` : 'Deadline passed'}
                      </div>
                      <div className="text-xs text-gray-500">Last Date</div>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center justify-center mb-4">
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

                {/* Shortlist Button */}
                <button
                  onClick={handleShortlist}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    shortlisted
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } focus:ring-4 focus:ring-blue-300 focus:outline-none`}
                >
                  {shortlisted ? '✓ Shortlisted' : 'Shortlist Candidates'}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployerPost
