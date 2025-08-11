import React from 'react'

const Jobcard = () => {
  return (
    <div>
      <div class="card px-3 bg-base-100 card-xs shadow-sm m-3" data-theme={"light"}>
  <div class="card-body">
    <h2 class="card-title text-2xl h-9">Microsoft</h2>
      <h2 class="card-title text-m text-gray-600">Software Engineer</h2>
    <p className=' text-[15px]'>Apply here to be a Software engineer at Microsoft</p>
    <div class="justify-left card-actions mb-3">
      <button class="btn btn-info text-white">See Status</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Jobcard
