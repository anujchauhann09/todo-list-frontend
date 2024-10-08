import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const validateName = (name) => {
        return name.trim().length > 0
    }

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const validatePassword = (password) => {
        return password.length >= 8
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!name || !email || !password) {
            toast.error("All fields must be filled out.");
            return;
        } else if (!validateName(name)) {
            toast.error("Name cannot be empty.");
            return;
        } else if (!validateEmail(email)) {
            toast.error("Invalid email format.");
            return;
        } else if (!validatePassword(password)) {
            toast.error("Password must be at least 8 characters long.");
            return;
        }

        axios.post('https://todo-list-backend-bian.onrender.com/auth/register', {email, password, name})
            .then(res => {
                    setName('')
                    setEmail('')
                    setPassword('')
                    localStorage.setItem('token', res.data.token || ''); 
                    localStorage.setItem('name', res.data.name || '');
		            navigate('/')
                    toast.success('Registration successful!')
                })
            .catch(err => {
                // alert(`Not registered, Please try again`)
                toast.error('Not registered, Please try again')
                // console.error(err)
            })
    }

    return (
        <>
            <div className="form-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit} id="register-form">
                    <input type="text" placeholder='Enter name' className="input-box" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder='Enter email' className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Enter password' className="input-box" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" id='register-btn'>Register</button>

                    <div>
                        <span id="already-account">Already have an account? </span>
                        <Link to='/login'>Click here</Link>
                    </div>
                </form>
            </div>
        </>
    )
}