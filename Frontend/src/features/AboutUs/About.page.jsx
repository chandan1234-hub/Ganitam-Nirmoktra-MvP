import React from 'react'
import './About.style.css'
import OwnerLogo from '../../assets/images/github_profile_anime.jpg'
import bg from '../../assets/images/1845799-1920x1080-desktop-full-hd-mass-effect-3-citadel-wallpaper-photo.jpg'
const Aboutpage = () => {
    return (
        <div className={'h-full min-h-screen mt-10'}>
            <div className={'min-w-full capitalize text-6xl gap-3 flex flex-col justify-center items-center mb-50'}>
                <h1>Welcome to Ganitam Nirmoktra</h1>
            </div>
            <section className="About-Ganitam-Nirmoktra mx-60 w-full mt-10 flex gap-60">
                <div className={'capitalize tracking-wider flex gap-12 w-[30%]'}>
                    <div className={'border'}></div>
                    <p className={'text-6xl leading-18'}>where all the your thoughts and question can shape your future
                        with the help of AI. </p>
                </div>
                <div className={'text-xl w-[20%] mt-40 capitalize flex gap-5'}>
                    <div className={"border rounded-4xl border-2 h-50"}></div>
                    <div className={'flex flex-col gap-5'}>
                        <p className={'mt-5'}>we believe that combination of human and AI can lead a world to new
                            generation where learning
                            is
                            not that much harder.</p>
                        <div className={'border rounded-4xl w-30 text-lg text-center p-1 bg-white'}>
                            Get In Touch
                        </div>
                    </div>
                </div>
            </section>
            <section className={'our-team min-h-screen w-[80%] mx-auto '}>
                <div className={'text-6xl w-full flex mt-40 justify-center'}>
                    <h1>Journey Of Ganitam Nirmoktra</h1>
                </div>
                <div className={'grid-images-section gap-10 mt-20'}>
                    <div>
                        <img src={OwnerLogo} alt="ownerLogo" className={'w-100  rounded-xl'} />
                    </div>
                    <div className={'col-span-2'}>
                        <img src={bg} alt="bg" className={'w-200 rounded-xl'} />
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Aboutpage