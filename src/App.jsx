import './App.css'
import { useState, useEffect } from 'react'
import TodoList from './components/TodoList/TodoList'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy'
import TermsOfService from './components/TermsOfService/TermsOfService'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const[isAuthenticated, setIsAuthenticated] = useState(false)
  const [name, setName] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('name');

    if (token) {
      const tokenExpiration = JSON.parse(atob(token.split('.')[1])).exp;
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime >= tokenExpiration) {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        setIsAuthenticated(false);
        setName('');
        navigate('/login'); 
      } else {
        setIsAuthenticated(true);
        setName(userName || '');
      }
    } else {
      setIsAuthenticated(false);
      setName('');
    }
  }, [navigate]);

  const handleLogout = () => {
    window.location.reload()
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setIsAuthenticated(false);
    setName('');
  };

  return (
    <>
      <header>
        <Navbar name={name} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      </header>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path='/' element={<TodoList />}></Route>
        <Route path='/register' element={<Register />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        <Route path='/login' element={<Login onLogin={() => {
          setIsAuthenticated(true)
          setName(localStorage.getItem('name'))
      }} />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
