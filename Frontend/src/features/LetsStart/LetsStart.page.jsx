import React from 'react'
import './LetsStart.style.css'
import '../../Globalcss/global.css'
// import { VscAccount } from "react-icons/vsc";


const LetsStartpage = () => {
    return (
        <div className='min-h-screen w-full bg-blue-300'>
            <div className='min-w-full h-screen items-center justify-center '>
                <div className='flex flex-col gap-5 justify-center items-center h-screen w-[40%] mx-auto capitalize text-center'>
                    <h1 className='text-amber-200 text-5xl z-90 '>Welcome , how can i help you?</h1>
                    <p className='text-amber-50 '>Please enter your question in the search box ! </p>
                </div>

                {/* side bar */}
                <aside className='bg-blue-200 w-[3%] h-full fixed top-0 left-0 z-50 flex flex-col justify-center items-center'>
                    <img src="" alt="" className='flex justify-center items-center mt-1' />
                    {/* <div className='flex justify-center items-center mt-1'>
                <VscAccount color='white' className='w-9 h-9'/>
                </div> */}

                </aside>
                {/* upper bar */}
                <aside className='bg-blue-200 w-full h-[6%] fixed top-0 z-50'>
                </aside>
                {/* search bar */}
                <div className='bg-blue-400 search-area w-[50%] h-[15%] rounded-xl fixed bottom-0 left-0 right-0 mx-auto mb-10'>
                    <div className='w-[70%] flex justify-start h-[70%] mx-auto'>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LetsStartpage