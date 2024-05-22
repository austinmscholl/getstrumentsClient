import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Home/Navbar';
import Auth from './auth/Auth';
import Splash from './Home/Splash';
import Footer from './Home/Footer';
import './styles.css'; // Consolidated CSS file

const App = () => {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setSessionToken(token);
    }
  }, []);

  const setSessionState = (token) => {
    try {
      localStorage.setItem('token', token);
      setSessionToken(token);
    } catch (error) {
      console.error('Failed to set token in localStorage', error);
    }
  };

  const logout = () => {
    setSessionToken('');
    localStorage.clear();
  };

  const protectedViews = () => (
    <Routes>
      {sessionToken === localStorage.getItem('token') ? (
        <Route path='/' element={<Splash sessionToken={sessionToken} />} />
      ) : (
        <Route path='/auth' element={<Auth setToken={setSessionState} />} />
      )}
    </Routes>
  );

  return (
    <Router>
      <div className="baseColor">
        <NavBar clickLogout={logout} />
        {protectedViews()}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
