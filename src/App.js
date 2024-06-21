import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Update the token state when the local storage token changes
    const updateToken = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', updateToken);


    return () => {
      window.removeEventListener('storage', updateToken);
    };
   
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/" element={token ? <Navigate to='https://room-booking-frontend-r2me.onrender.com/home'/>: <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
     
    </div>
  );
}

export default App;
