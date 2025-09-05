import React from 'react'
import {Router , Routes , Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Mainpage from './pages/Mainpage'
import Navbar from './components/Navbar'
import ProtecedRoute from './components/ProtectedRoute'
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route path ="/" element = {<Mainpage />} />
            <Route path ="/login" element = {<Login />} />
            <Route path ="/signup" element = {<Signup />} />
            <Route path ="/Dashboard" element = {
            <ProtecedRoute>
            <Dashboard />
            </ProtecedRoute>
            }
            />
          </Routes>
        </div>
      </Router>
      
    </div>
  )
}

export default App
