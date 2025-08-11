import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div theme={"cyberpunk"}>
    <Navbar/>
          <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white bg-[#34019a00] pt-10 pl-10 pr-10 mt-4 rounded-lg">
        {/* Become a Instructor Button */}
       

        {/* Heading */}
        <div className="text-center text-4xl font-semibold" >
          Empower Your Future with {" "}
          <span className="bg-gradient-to-b from-[#d9f108] via-[#f4bc05] to-[#f5700a] text-transparent bg-clip-text font-bold">
   Coding Skills
</span>
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-5">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-row gap-7">
          <button active={true} >
            Learn More
          </button>
          <button active={false} >
            Book a Demo
          </button>
        </div>

        {/* Video
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-white w-[800px] rounded-full">
          <video
            className=" rounded-3xl shadow-[0_0_62px_0] "
            muted
            loop
            autoPlay
            
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div> */}
        </div>
    </div>
  )
}

export default Home
