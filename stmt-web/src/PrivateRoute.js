import React, { useEffect } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useAuth } from './AuthProvider';

function PrivateRoute({ children , role, ...rest }) {
    const { isAuthenticated } = useAuth();

    const token = localStorage.getItem('token');
    let decodedToken = null;
    if (token) decodedToken = jwtDecode(token); 
    const navigate = useNavigate();
    console.log(isAuthenticated+"inside privayte");
    
    useEffect(() => {
        if (!isAuthenticated || !token) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if(token && (decodedToken.roles.indexOf(role) !== -1)){
        console.log("inside this");
        return children
      }
      return <Navigate to="/login" />
}

export default PrivateRoute;