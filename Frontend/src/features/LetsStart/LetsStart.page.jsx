import './LetsStart.style.css'
import {UserButton} from '@clerk/react'

const LetsStartpage = () => {


    return (
        <section
            className={"lets-start-page w-full h-screen bg-(--page-bg) text-white font-sans font-extralight flex flex-col items-center justify-center"}>
            <div className={'w-[90%] mx-auto'}>
                <div className={'container flex justify-center w-[40%] flex justify-center flex-col text-center mx-auto'}>
                    <h1 className={"text-5xl"}>Welcome to Ganitam Nirmoktra</h1>
                    <h6 className={'text-lg'}>How can I help you chandan?</h6>
                </div>
            </div>
            <div className={'w-[50%] rounded-full border border-gray-200 bottom-20 fixed'}>
            <form className="w-full flex flex-row items-center">
                <button className={'bg-gray-400 flex justify-start mx-2  items-center w-10 h-10 rounded-full'}>

                </button>

                <input type={'text'} id={''} placeholder={'Ask any question you want to ask.'} className={'w-[95%] p-4 rounded-full outline-none'}/>
            </form>
            </div>
        </section>
    )
}

export default LetsStartpage
