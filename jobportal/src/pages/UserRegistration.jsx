import React, { useState } from 'react';
import SidebarProfile from '../components/SidebarProfile.jsx';
import ProfileSetter from '../components/ProfileSetter.jsx';
import Myapplications from "../components/Myapplications.jsx";
import Navbar from '../components/Navbar.jsx';
import { useSelector } from 'react-redux';
import Home from './Home.jsx';

const UserRegistration = () => {
  const token = useSelector((state) => state.auth.token);
  const [showProfile, setShowProfile] = useState(true);

  return (
    <div
      style={{
       
        background: "radial-gradient(circle at top left,  #000c28, #1a006f, #3f0071, #0a1e55 )",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {token ? (
        <>
          <Navbar/>
          <div className='flex flex-grow' style={{ padding: '20px' }}>
            <SidebarProfile showprofile={showProfile} setShowProfile={setShowProfile} />
            <div className='ml-15 flex-grow'>
              {!showProfile ? <Myapplications /> : <ProfileSetter />}
            </div>
          </div>
        </>
      ) : (
        <Home />
      )}
    </div>
  );
}

export default UserRegistration;
