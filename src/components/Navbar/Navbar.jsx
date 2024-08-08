import './Navbar.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

Navbar.propTypes = {
    name: PropTypes.string.isRequired,
};

export default function Navbar({ name, isAuthenticated, handleLogout }) {
    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                {
                    isAuthenticated ? (
                        <div id="authenticated-div">
                            <Link to='/'><span id='todo-app-logo'>TodoApp</span></Link>
                            <div>
                                <span id='display-name'>{name}</span>
                                <button onClick={handleLogout} id='logout-btn'>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <div id="non-authenticated-div">
                            <Link to='/'><span id='todo-app-logo'>TodoApp</span></Link>
                            <div>
                                <Link to='/register' className='navbar-logo'>Register</Link>
                                <span>/</span>
                                <Link to='/login' className='navbar-logo'>Login</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </nav>
    )
}
