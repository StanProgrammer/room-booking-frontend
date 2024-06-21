import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../styles/Signup.css'
import { toast } from 'react-toastify'

function Signup() {    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`${backendUrl}/register`, { name, email, password });
            if(result.data.statusCode === 409){
                toast(result.data.msg);
            } else {
                localStorage.setItem('token', result.data.token);
                toast.success("Registration successful");
                navigate("/home");
            }
        } catch (error) {
            toast.error('Server error');
            console.log(error);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 signup-container">
            <div className="bg-white p-3 rounded w-25">
                <h2><center>Sign Up</center></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input 
                            type="text" 
                            placeholder='Enter Name' 
                            autoComplete='off' 
                            name='name' 
                            className='form-control rounded-0'
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                            type="email" 
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
                        <input 
                            type="password" 
                            placeholder='Enter Password' 
                            name='password' 
                            className='form-control rounded-0' 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Sign Up
                    </button>
                </form>
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
