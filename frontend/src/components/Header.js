import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="logo-nav">
      <img src="/Images/IITDhLogo.png" alt="IITDh Logo" style={{ height: '60px' }} />
      <div>IIT Dharwad</div>
      </div>
      <div className='nav-right'>
        <Link to="/" className="home-button">Home</Link>
        <button className='google-signin'>Sign in with Google</button>
      </div>
    </div>
  );
}

export default Header;
