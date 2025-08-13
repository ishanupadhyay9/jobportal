import React from 'react'
import Employersidebar from '../components/employersection/Employersidebar.jsx'
import EmployerProfile from '../components/employersection/EmployerProfile.jsx'
import CreateJobPost from '../components/employersection/CreateJobPost.jsx'
import Navbar from '../components/Navbar.jsx'
import Postedjobs from '../components/employersection/Postedjobs.jsx'
import { useState } from 'react';
const EmployerSection = () => {
  const [page,setpage]=useState(1);
  return (
    <div className='flex flex-col'>
      
      <Navbar/>
      <div className='flex'>
        <Employersidebar page={page} setpage={setpage}/> 
        {
          page === 1?<EmployerProfile/>:
         ( (page === 3)?<CreateJobPost/>:
          <Postedjobs/>)
        }

       </div>
   
    </div>
  )
}

export default EmployerSection
