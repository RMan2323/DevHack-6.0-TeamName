import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../components/axiosInstance'; 

function Header() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      // Send Google credential to backend to get a JWT
      const response = await axiosInstance.post('/api/auth/google-login', {
        credential: credentialResponse.credential
      });

      const { token } = response.data;
      localStorage.setItem('backendToken', token); // Store backend-generated token
      const decoded = jwtDecode(token);
      
      setIsAuthenticated(true);
      setUser(decoded);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('backendToken'); // Remove backend token on logout
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
