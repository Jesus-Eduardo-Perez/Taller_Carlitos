// src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const userType = localStorage.getItem('user_type') || sessionStorage.getItem('user_type');

  if (!token) {
    return <Navigate to="/" />;
  }

  if (userType !== 1) {
    return <Navigate to="/administrador" />;
  }

  return children;
};

export default AdminRoute;