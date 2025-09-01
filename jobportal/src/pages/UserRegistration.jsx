import React, { useState } from 'react'
import SidebarProfile from '../components/SidebarProfile.jsx';
import ProfileSetter from '../components/ProfileSetter.jsx';
import Myapplications from "../components/Myapplications.jsx"
import Navbar from '../components/Navbar.jsx';
import { useSelector } from 'react-redux';
import Home from './Home.jsx';
const UserRegistration = () => {
  const token = useSelector((state)=>state.auth.token);
  const [showProfile, setShowProfile] = useState(true);
  return (
    
<div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-purple-800">
  {
    token? <div>
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
    :<Home/>
  }
</div>
  );
}

export default UserRegistration