import {NavLink} from 'react-router'
import './Navbar.css'
import '../../Globalcss/global.css'
const Navbar = () => {
    return (
        <div className="Navbar w-[40%] sticky z-0 rounded-4xl ">
                <ul className=" Navlinks flex justify-around w-[40%] capitalize mx-auto p-3 text-white bg-white-0.6 backdrop-blur-3xl border border-white rounded-4xl">
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
