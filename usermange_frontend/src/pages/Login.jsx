import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import{authService} from '../service/authServices'
import { Link } from 'react-router-dom';
import '../styles/Login.css'
const Login = () => {
    const[error ,seterror] = useState('');
    const[username , setusername] = useState('');
    const[password , setpassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async(e)=>{
        e.preventDefault();
        seterror('');
        try{
            await authService.login(username , password);
            navigate('/dashboard');
        }
        catch(error){
            seterror("Login Failed. Please try again.");
            console.log("Login Failed", error);
        }

    }
  return (
    <div>
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                {
                    error &&(
                        <div className="error-message">
                            {error}
                        </div>
                    )
                }
                <form onSubmit = {handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange ={(e)=>setusername(e.target.value) }required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange ={(e)=>setpassword(e.target.value) }required />
                    </div>
                    <button type="submit" className ="login-button">Login</button>
                    <p>Don't have account ? <Link to = "/signup">Signup</Link></p>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Login
