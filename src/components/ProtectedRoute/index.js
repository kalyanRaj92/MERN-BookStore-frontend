import React from 'react'
import {Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({element:Component, ...rest}) => {
    const token = localStorage.getItem("token");

    return token ? <Outlet /> : <Navigate to="/login" />;
    
}

export default ProtectedRoute