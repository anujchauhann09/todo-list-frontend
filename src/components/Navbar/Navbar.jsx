import './Navbar.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useState } from 'react'

Navbar.propTypes = {
    name: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default function Navbar({ name, isAuthenticated, handleLogout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <div className='general-navbar'><Link to='/'><span id='todo-app-logo'>TodoApp</span></Link>
                    <button type='button' id='menu-toggle' onClick={toggleMenu}>
                        ☰
                    </button></div>
                <div className={`navbar-links ${isMenuOpen ? 'open' : 'close'}`}>
                    {
                        isAuthenticated ? (
                            <div id="authenticated-div">
                                <div id='sub-authenticated-div'>
                                    <Link to='/privacy-policy' id='privacy-policy'>Privacy Policy</Link>
                                    <Link to='/terms-of-service' id='terms-of-service'>Terms of Service</Link>
                                    <Link to='/about' id='about'>About</Link>
                                    <Link to='/contact' id='contact'>Contact</Link>
                                    <span id='display-name'>{name}</span>
                                    <button onClick={handleLogout} id='logout-btn'>Logout</button>
                                </div>
                            </div>
                        ) : (
                            <div id="non-authenticated-div">
                                <div id='sub-non-authenticated-div'>
                                    <Link to='/privacy-policy' id='privacy-policy'>Privacy Policy</Link>
                                    <Link to='/terms-of-service' id='terms-of-service'>Terms of Service</Link>
                                    <Link to='/about' id='about'>About</Link>
                                    <Link to='/contact' id='contact'>Contact</Link>
                                    <span><Link to='/register' className='navbar-logo'>Register</Link>/<Link to='/login' className='navbar-logo'>Login</Link></span>

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}
