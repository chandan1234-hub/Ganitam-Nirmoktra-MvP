import React from 'react'
import './LetsStart.style.css'
import '../../Globalcss/global.css'
import MathBackground from '../../components/Uicomponents/MathBackground/MathBackground.jsx'

const LetsStartpage = () => {
    return (

   <div className="w-full h-full overflow-hidden relative bg-white">
<MathBackground/>
<div className='my-glass-effect w-[90%] h-[90%] rounded-xl flex flex-col justify-center items-center gap-4 mx-auto mt-20'>
    <div className='w-[90%] flex flex-col gap-4 justify-center items-center mx-auto '>
        <div className='flex flex-row w-full'>
        <div className='border h-100'></div>
        <h1>
            hello
        </h1>
        </div>
    
    </div>
   </div>
   </div>
    )
}

export default LetsStartpage