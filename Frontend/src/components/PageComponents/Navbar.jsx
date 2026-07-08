import {NavLink} from 'react-router'
import './Navbar.css'
import '../../Globalcss/global.css'
const Navbar = () => {
    return (
        <div className="Navbar w-full sticky top-0 z-50">
                <ul className=" Navlinks my-glass-effect flex justify-around w-auto capitalize mx-auto p-3 rounded-4xl">
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