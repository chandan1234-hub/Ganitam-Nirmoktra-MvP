import {NavLink} from 'react-router'
import './Navbar.css'
import '../../Globalcss/global.css'
const Navbar = () => {
    return (
        <div className="Navbar w-[40%] sticky z-100">
                <ul className=" Navlinks flex justify-around w-[40%] capitalize mx-auto p-3 ">
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