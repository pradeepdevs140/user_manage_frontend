import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {authService} from '../service/authServices'
const Signup = () => {

    const[error ,seterror] = useState('');
    const[username , setusername] = useState('');
    const[email , setemail] = useState('');
    const[password , setpassword] = useState('');
    const[confirmpassword , setconfirmpassword] = useState('');
    const navigate = useNavigate();
    const handlesignup = async(e)=>{
        e.preventDefault();
        seterror('');
        if(password!=confirmpassword){
            seterror("Password and Confirm Password do not match");
            return;
        }
        try{
            await authService.signup(username , email , password);
            navigate('/login');
        }
        catch(error){
            seterror("Signup Failed. Please try again.");
            console.log("Signup Failed", error);
        }
    }
  return (
    <div>
        <div className="singup-container">
            <div className="signup-form">
                <h2>Signup</h2>
                {
                    error &&(
                        <div className="error-message">
                            {error}
                        </div>
                    )
                }
                <form onSubmit = {handleSignup}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" 
                        value={username} 
                        onChange={(e)=>setusername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text"  id ="email" value={email} onChange ={(e)=>setemail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">password</label>
                        <input type="text"  id ="password" value={password} onChange ={(e)=>setpassword(e.target.value)} required />
                    </div>
                      <div className="form-group">
                        <label htmlFor="confirm-password">confirm-password</label>
                        <input type="text"  id ="confirm-password" value={confirmpassword} onChange ={(e)=>setconfirmpassword(e.target.value)} required />
                    </div>
                    <button type="submit" classname ="signup-button">Signup</button>
                    <p>Already have the account ? <Link to ="/login">Login</Link></p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup
