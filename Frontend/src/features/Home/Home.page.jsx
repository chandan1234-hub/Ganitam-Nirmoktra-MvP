import React from 'react'
import './Home.style.css'
import { HiArrowLongDown } from "react-icons/hi2";

const Homepage = () => {
  return (
    <div>
      <article className="Hero-Section h-[80vh] w-[80%] mx-100">
        <div className="flex mt-30  items-center gap-6">
          <div className="h-1 border w-20 flex items-center  bg-amber-400 my-4"></div>
          <p className="Herarchy uppercase text-amber-400">want to learn mathematics in a new way</p>
        </div>
        <p className="Hero-text w-[70%]">welcome ! to ganitam nirmoktra where you get curious to learn and solve</p>
        <button className='flex items-center text-white'>
          scroll down 
            <HiArrowLongDown className="
            size-7"/>
        </button>
      </article>
    </div>
  )
}

export default Homepage