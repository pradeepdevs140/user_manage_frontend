import React from 'react'
import {authService} from '../service/authServices'
const ProtectedRoute  = ({children}) => {
    const isAuthenticated = authService.isAuthenticated();
    if(!isAuthenticated){
        return <Navigate to ="/login" />
    }

  return children;
}
export default ProtectedRoute
