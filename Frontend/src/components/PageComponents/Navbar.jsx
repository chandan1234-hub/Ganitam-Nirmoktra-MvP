import {NavLink} from 'react-router'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className="Navbar w-full ">
      <ul className="Navlinks flex justify-center gap-20 capitalize mx-auto p-4 rounded-4xl">
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