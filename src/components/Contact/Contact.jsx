import { useState } from 'react'
import axios from 'axios'
import './Contact.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contactNumber, setContactNumber] = useState(null)
    const [message, setMessage] = useState("")

    const validateName = (name) => {
        return name.trim().length > 0
    }

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const validateNumber = (contactNumber) => {
        return contactNumber && String(contactNumber).length <= 10
    }

    const validateMessage = (message) => {
        return message.trim().length > 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!name || !email || !message) {
            toast.error("All fields must be filled out.");
            return;
        } else if (!validateName(name)) {
            toast.error("Name cannot be empty.");
            return;
        } else if (!validateEmail(email)) {
            toast.error("Invalid email format.");
            return;
        } else if (!validateNumber(contactNumber)) {
            toast.error("Number must be exactly 10 digit.");
            return;
        } else if(!validateMessage(message)) {
            toast.error("Message cannot be empty.");
            return;
        }

        axios.post('https://todo-list-backend-bian.onrender.com/contact', {name, email, contactNumber, message})
            .then(res => {
                    setName('')
                    setEmail('')
                    setContactNumber(null)
                    setMessage('')
                    toast.success('Data successfully submitted!')
                })
            .catch(err => {
                toast.error('Data not submitted, Please try again')
            })
    }

    return (
        <>
            <div className="contact-container">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit} id="contact-form">
                    <input type="text" placeholder='Enter name' className="input-box" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder='Enter email' className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input
                        type="text"
                        placeholder='Enter contact number'
                        className="input-box"
                        value={contactNumber}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                                setContactNumber(Number(value));
                            }
                        }}
                        maxLength={10}
                    />
                    <textarea
                        className='input-box'
                        id='textarea'
                        maxLength="300"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    <button type="submit" id='submit-btn'>Submit</button>
                </form>
            </div>
        </>
    )
}