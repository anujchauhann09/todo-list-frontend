import './App.css'
import { useState, useEffect } from 'react'
import TodoList from './components/TodoList/TodoList'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

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
      <Routes>
        <Route path='/' element={<TodoList />}></Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login onLogin={() => {
          setIsAuthenticated(true);
          setName(localStorage.getItem('name'));
      }} />} />
      </Routes>
    </>
  )
}

export default App
