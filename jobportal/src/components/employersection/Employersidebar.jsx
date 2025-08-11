import React from 'react'
import { Link } from 'react-router'
const Employersidebar = () => {
  return (
     <div>
       <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0" data-theme="light">
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
           JobGenius 
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case  `}
        >
          <span>Home</span>
        </Link>

        <button
   
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded-xl
         `}
        >
          <span>My Profile</span>
        </button>

        <button
          className={`btn btn-ghost justify-start w-full gap-3 px-3 rounded-xl normal-case 
           `}

        >
          <span>Posted jobs</span>
        </button>

         <button
          className={`btn btn-ghost justify-start w-full gap-3 px-3 rounded-xl normal-case 
          `}

        >
          <span>Create job post</span>
        </button>
      </nav>

     
      
    </aside>
    </div>
  )
}

export default Employersidebar
