import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Safelogin = () => {
  const isLoggedIn = localStorage.getItem('Logindata');

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Safelogin;