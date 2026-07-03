import React from 'react'
import {Link} from 'react-router'
import './Footer.css'
const Footer = () => {

  return (
    <div className='w-full h-80'>
      <div className="Footer-bar flex w-[80%] items-center justify-around rounded-4xl h-60 mx-auto border">
        <section className='start-footer-text'>
          <p className='capitalize'>be ready to change the future and allow you to fly in the future</p>
          <p className='capitalize'>copyright 2026 ganitam nirmoktra , inc. tems &privacy</p>
        </section>
        <div className="blog">
          <tittle className='text-amber-400 capitalize'>more on the Blog</tittle>
          <Link to = '/about'>About Us</Link>
          <Link to='/privacy-policy'>Privacy Policy</Link>
          <Link to='/SubscriptionPlans'>Subscription Plans</Link>
        </div>
        <div className="about-Ganitam-Nirmoktra flex flex-col text-amber-50">
          <tittle className='text-amber-400 capitalize'>more on ganitam nirmoktra</tittle>
          <Link to = '/contact'>Contact Us</Link>
          <Link to='/faq'>FAQs</Link>
          <Link to='/SubscriptionPlans'>Subscription Plans</Link>
        </div>
        <div className="social-links">

        </div>
      </div>
    </div>
  )
}

export default Footer