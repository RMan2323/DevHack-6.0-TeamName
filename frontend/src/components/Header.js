import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);

  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);
    setIsAuthenticated(true);
    setUser(decoded);
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
