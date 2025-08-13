import React, { useState } from 'react'
import SidebarProfile from '../components/SidebarProfile.jsx';
import ProfileSetter from '../components/ProfileSetter.jsx';
import Myapplications from "../components/Myapplications.jsx"
import Navbar from '../components/Navbar.jsx';
const UserRegistration = () => {
  const [showProfile, setShowProfile] = useState(true);
  return (
    
<div>
  <Navbar/>
    <div className='flex'>
<SidebarProfile showprofile={showProfile} setShowProfile={setShowProfile}/>
 <div className='ml-15'>
  {
!showProfile? <Myapplications/>:<ProfileSetter/>
  }
 </div>
</div>
</div>
  );
}

export default UserRegistration
