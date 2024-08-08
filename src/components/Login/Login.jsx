import { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import './Login.css'

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://127.0.0.1:5173/auth/login', {email, password})
            .then(res => {
                setEmail('')
                setPassword('')
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('name', res.data.name || '')
                onLogin()
		        navigate('/') 
            })
            .catch(err => {
                alert(`Not logged in, Please try again`)
                // console.error(err)
            })
    }

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit} id="login-form">
                    <input type="email" placeholder='Enter email' className='input-box' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Enter password' className='input-box' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" id='login-btn'>Login</button>

                    <div>
                        <span>Don't have an account? </span>
                        <Link to='/register'>Click here</Link>
                    </div>
                </form>
            </div>
        </>
    )
}