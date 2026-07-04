import React from 'react'
import './Home.style.css'
import { HiArrowLongDown } from "react-icons/hi2";
import { HiArrowLongRight } from "react-icons/hi2";
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
        <section className='mx-90 mt-20 HeroSection-side-para w-2xl flex gap-4'>
          <p className="">where curiosity meets computation step into a world where mathematics isn't about memorizing rules, but about discovering patterns, solving problems and shifting perspectives. 
             
             <button className="border p-2 w-55 text-m rounded-4xl flex items-center gap-2 justify-center">start your journey<HiArrowLongRight className='size-7'/></button>
             </p>
        </section>


      </article>

    </div>
  )
}

export default Homepage