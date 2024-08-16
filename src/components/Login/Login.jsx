import { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import './Login.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const validatePassword = (password) => {
        return password.length >= 8
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error("Email and password cannot be empty.");
            return;
        } else if (!validateEmail(email)) {
            toast.error("Invalid email format.");
            return;
        } else if (!validatePassword(password)) {
            toast.error("Password must be at least 8 characters long.");
            return;
        }

        axios.post('https://todo-list-backend-bian.onrender.com/auth/login', {email, password})
        // axios.post('http://127.0.0.1:5173/auth/login', {email, password})
            .then(res => {
                setEmail('')
                setPassword('')
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('name', res.data.name || '')
                onLogin()
	navigate('/') 
                toast.success('Login successful!')
            })
            .catch(err => {
                // alert(`Not logged in, Please try again`)
                toast.error('Not logged in, Please try again')
                // console.error(err)
            })
    }

    return (
        <>
            <div className="form-container">
                <h2 id="login-heading">Login</h2>
                <form onSubmit={handleSubmit} id="login-form">
                    <input type="email" placeholder='Enter email' className='input-box' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Enter password' className='input-box' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" id='login-btn'>Login</button>

                    <div>
                        <span id='dont-account'>Don't have an account? </span>
                        <Link to='/register'>Click here</Link>
                    </div>
                </form>
            </div>
        </>
    )
}