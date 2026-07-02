import React from 'react'
import {NavLink} from 'react-router'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className="navbar mx-auto p-4">
      <ul className="navbar-pages flex justify-around items-center place-self-auto border-2 rounded-4xl p-3">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/lets-start">Let's Start</NavLink>
        </li>
        <li>
          <NavLink to="/SubscriptionPlans">Plans</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact Us</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Navbar