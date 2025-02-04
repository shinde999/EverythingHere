
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ResponsiveAppBar from './UI/NavBar';
export default function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/';

  return (
    <>
      {!hideNavbar && <ResponsiveAppBar />}
      <Outlet />
    </>
  );
}
