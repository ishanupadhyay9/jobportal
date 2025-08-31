import React from 'react'
import Navbar from '../components/Navbar'
import JobsIntroSection from '../components/Jobs/JobsIntroSection'
import JobListingsSection from '../components/Jobs/JobListingSection'
import AllJobsSection from '../components/Jobs/AllJobsSection'
import RecentJobs from '../components/Jobs/RecentJobs'
const Jobs = () => {

  return (
    <div>
      <Navbar/>
      
      <JobsIntroSection/>
      <JobListingsSection/>
      <RecentJobs/>
      <AllJobsSection/>
    </div>
  )
}

export default Jobs
