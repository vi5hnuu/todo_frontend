import React from 'react'
import { Outlet } from 'react-router-dom'
import Auth from '../pages/Auth';

function ProtectedRoute({ isAuthenticated }) {
  console.log(isAuthenticated);
  return <>
    {isAuthenticated && <Outlet />}
    {!isAuthenticated && <Auth />}
  </>
}

export default ProtectedRoute