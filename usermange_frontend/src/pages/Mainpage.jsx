import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/Mainpage.css'
const Mainpage = () => {
    const navigate = useNavigate();
    const handleGettingStarted =()=>{
        navigate('/signup');
    }
    const handleLearnMore =()=>{
        window.open('https://google.com','_blank');
    }
  return (
    <div>
        <div className="home-container">
            <h1 className="home-title">
                Welcome to User Management System
            </h1>
            <div className="home-buttons">
                <button className = "btn btn-primary" onClick ={handleGettingStarted}>Get Started</button>
                <button className = "btn btn-secondary" onClick ={handleLearnMore}>Lean More </button>
            </div>
        </div>
    
      
    </div>
  )
}

export default Mainpage
