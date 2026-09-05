import { useState } from 'react'
import {NavLink} from 'react-router'
import './Navbar.css'
import '../../Globalcss/global.css'
const Navbar = ({ mobileActions }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="Navbar" aria-label="Primary navigation">
                <button
                    type="button"
                    className="navbar-toggle"
                    aria-expanded={isMenuOpen}
                    aria-controls="primary-navigation"
                    aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    onClick={() => setIsMenuOpen((open) => !open)}
                >
                    <span className="bar" />
                    <span className="bar" />
                    <span className="bar" />
                </button>
                <ul id="primary-navigation" className={`Navlinks${isMenuOpen ? ' active' : ''}`}>
                    <li>
                        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/lets-start" onClick={() => setIsMenuOpen(false)}>Let's Start</NavLink>
                    </li>
                    <li>
                        <NavLink to="/SubscriptionPlans" onClick={() => setIsMenuOpen(false)}>Plans</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</NavLink>
                    </li>
                    {mobileActions && (
                        <li className="mobile-auth-actions" onClick={() => setIsMenuOpen(false)}>
                            {mobileActions}
                        </li>
                    )}
                </ul>
        </nav>
    )
}

export default Navbar
