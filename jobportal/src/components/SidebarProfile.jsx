import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
const SidebarProfile = (props) => {
  const showProfile = props.showprofile;
  const setShowProfile = props.setShowProfile;
  const isregistered = useSelector((state)=>state.auth.isRegistered);
  return (
    <div>
       <aside className="w-64 h-90vh bg-gray-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-[-10px] left-[-5px]" data-theme="light">
    

      <nav className="flex-1 p-4 space-y-1">
       {isregistered && <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case  `}
        >
          <span>Home</span>
        </Link>} 

        <button
   
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded-xl
         ${showProfile&&"bg-gray-600 text-white"}`}
         onClick={()=>{setShowProfile(true)}}
        >
          <span>My Profile</span>
        </button>

       {
        isregistered &&  <button
          className={`btn btn-ghost justify-start w-full gap-3 px-3 rounded-xl normal-case 
          ${!showProfile&&"bg-gray-600 text-white"} `}
                   onClick={()=>{setShowProfile(false)}}

        >
          <span>Applications</span>
        </button>
       }
      </nav>

     
      
    </aside>
    </div>
  )
}

export default SidebarProfile
