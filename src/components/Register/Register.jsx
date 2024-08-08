import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://127.0.0.1:5173/auth/register', {email, password, name})
            .then(res => {
                    setName('')
                    setEmail('')
                    setPassword('')
                    localStorage.setItem('token', res.data.token || ''); 
                    localStorage.setItem('name', res.data.name || '');
		            navigate('/')
                })
            .catch(err => {
                alert(`Not registered, Please try again`)
                // console.error(err)
            })
    }

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit} id="register-form">
                    <input type="text" placeholder='Enter name' className="input-box" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder='Enter email' className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Enter password' className="input-box" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" id='register-btn'>Register</button>

                    <div>
                        <span>Already have an account? </span>
                        <Link to='/login'>Click here</Link>
                    </div>
                </form>
            </div>
        </>
    )
}