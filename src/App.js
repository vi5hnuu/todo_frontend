import React from 'react';
import './App.css';
import Auth from './pages/Auth';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';


function App() {
  const { isAuthenticated } = useSelector(state => state.auth)

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path='' element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App;
