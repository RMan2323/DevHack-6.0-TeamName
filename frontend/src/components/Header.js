import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from './axiosInstance';

function Header() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axiosInstance.post('/api/auth/google', {
        token: credentialResponse.credential
      });
      
      // Backend should return user data + JWT
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUser(user);
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <div className="header">
      <div className="logo-nav">
        <img src="../Images/IITDhLogo.png" alt="IITDh Logo" style={{ height: '40px' }} />
        <div>IIT Dharwad</div>
        <Link to="/" className="home-button">Home</Link>
      </div>
      <div className='nav-right'>
        {isAuthenticated ? (
          <>
            <span className="hi-username">Hi, {user.given_name}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Header;
