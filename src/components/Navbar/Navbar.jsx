import './Navbar.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useState, useRef, useEffect  } from 'react'

Navbar.propTypes = {
    name: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default function Navbar({ name, isAuthenticated, handleLogout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const buttonRef = useRef(null)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const handleClickOutside = (event) => {
        if (
            menuRef.current &&
            buttonRef.current &&
            !menuRef.current.contains(event.target) &&
            !buttonRef.current.contains(event.target) &&
            isMenuOpen
        ) {
            setIsMenuOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMenuOpen])

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <div className='general-navbar'><Link to='/'><span id='todo-app-logo'>TodoApp</span></Link>
                    <button ref={buttonRef} type='button' id='menu-toggle' onClick={toggleMenu}>
                        ☰
                    </button></div>
                <div ref={menuRef} className={`navbar-links ${isMenuOpen ? 'open' : 'close'}`}>
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
