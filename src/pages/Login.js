import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import '../styles/Login.css'
function Login() {    

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post(`${backendUrl}/login`, { email, password })
            if(result.data.statusCode === 404 || result.data.statusCode === 400){
                toast.error(result.data.msg)
            }
            else{
            localStorage.setItem('token',result.data.token)
            window.location.href = '/home';
            }
        } catch (error) {
            toast.error('Server error');
            console.log(error)
        }       
    }


  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 login-container">
        <div className="bg-white p-3 rounded w-25">
            <h2><center>Login</center></h2>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input type="email" 
                    placeholder='Enter Email' 
                    autoComplete='off' 
                    name='email' 
                    className='form-control rounded-0' 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">
                        <strong>Password</strong>
                    </label>
                    <input type="password" 
                    placeholder='Enter Password' 
                    name='password' 
                    className='form-control rounded-0' 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                </button>
                </form>
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
            
        </div>
    </div>
  );
}

export default Login;