import React from 'react'
import Jobcard from './Jobcard'

const Myapplications = () => {
  return (
    <div className=''>
         <h1 className="text-4xl font-bold text-center mt-4 mb-15 w-[70%] ">
      Active applications
    </h1>
     <div className='grid grid-rows-4 grid-cols-3 gap- justify-center items-center gap-3 p-1 m-2 mr-20' >
    <Jobcard/>
    <Jobcard/>
    <Jobcard/>
    <Jobcard/>
    <Jobcard/>
    <Jobcard/>
    <Jobcard/>
    <Jobcard/>
     
     </div>
    </div>
  )
}

export default Myapplications
