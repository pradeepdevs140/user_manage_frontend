import React from 'react'
import {authService} from '../service/authServices'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'
const Navbar = () => {
    const navigate = useNavigate();
    const currentUser = authService.getCurrentUser();
    const handleLogout = async()=>{
       try{
        await authService.logout();
        navigate('/login');
       }
       catch(error){
        console.log("Logout Failed");
       }

    }
  return (
    <div>
      <nav className='navbar'>
        <Link to ="/" className='navbar-brand'>User Management</Link>
        <div className="navbar-links">
            {currentUser ?
             (
                <>
                <span className ="navbar-user">
                    Welcome , {currentUser.username}
                </span>
                |<Link to = "/dashboard" className ="navbar-link">Dashboard</Link>
                <Button onClick={handleLogout} className = "Logout-button">Logout</Button>
                </>
                

            ):
            <>
            <Link to ="/login" className ="navbar-link">Login</Link>
            <Link to ="/signup" className = "navbar-link">Signup</Link>
            </>
        }
        </div>
      </nav>
    </div>
  )
}

export default Navbar
