import './LetsStart.style.css'
import {UserButton} from '@clerk/react'
import react from 'react'
import {useState} from "react";
import {IoHomeOutline} from "react-icons/io5";
import {FaHistory} from "react-icons/fa";
import {HiBars3} from "react-icons/hi2";
import {LuPlus} from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";

const LetsStartpage = () => {
    const [isOpen, setIsOpen] = useState(true)
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }
    const menuItems = [
        {
            name: 'Home', icon: <IoHomeOutline/>
        },
        {
            name: 'Profile', icon: <UserButton/>,
        },
        {
            name: 'History', icon: <FaHistory/>
        }
    ]

    return (
        <div
            className={"flex h-screen bg-gray-100"}>
            {/*side bar*/}

            <div
                className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'}`}>
                {/*Toggle Button*/}
                <div className={'flex items-center justify-between p-4 border border-b border-gray-700'}>
                    <span className={`font-bold text-lg ${!isOpen && 'hidden'}`}>Ganitam</span>
                    <button onClick={toggleSidebar} className={'text-2xl cursor-pointer focus:outline-none'}>
                        <HiBars3/>
                    </button>
                </div>

                {/*Navigation Links*/}
                <ul className={'mt-6 space-y-2'}>
                    {
                        menuItems.map((item, i) => (
                                <li
                                    key={i}
                                    className={'flex justify-center items-center px-4 py-3 hover:bg-gray-700 cursor-pointer space-x-4'}>
                                    <div className={'text-xl'}>{item.icon}</div>
                                    <span
                                        className={`transition-opacity duration-300 cursor-pointer ${!isOpen && "opacity-0 hidden"}`}>
                                    {item.name}
                                </span>
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
            {/*main page*/}
            <div
                className={'lets-start-page w-full h-screen bg-(--page-bg) text-white font-sans font-extralight flex flex-col items-center justify-center'}>
                <div
                    className={'container flex justify-center w-[40%] flex justify-center flex-col text-center mx-auto'}>
                    <h1 className={"text-5xl"}>Welcome to Ganitam Nirmoktra</h1>
                    <h6 className={'text-lg'}>How can I help you chandan?</h6>
                </div>
                <div className={'w-[50%] rounded-full mx-auto border border-gray-200 bottom-20 fixed'}>
                    <form className="flex flex-row items-center">
                        <button
                            className={'flex justify-start mx-2  items-center w-10 h-10 rounded-full focus:outline-none'}>
                            <LuPlus className={'w-8 h-7 mx-auto'}/>
                        </button>
                        <input type={'text'} id={''} placeholder={'Ask any question you want to ask.'}
                               className={'w-full p-4 rounded-full outline-none text-white'}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LetsStartpage
