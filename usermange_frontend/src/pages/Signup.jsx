import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../service/authServices'
import '../styles/Signup.css'

const Signup = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }
    try {
      await authService.signup(username, email, password);
      navigate('/login');
    } catch (error) {
      setError("Signup Failed. Please try again.");
      console.log("Signup Failed", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Signup</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required />
          </div>
          <button type="submit" className="signup-button">Signup</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup;
