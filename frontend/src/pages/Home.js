import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-layout">
      <div className="main-content">
        {/* Marketplace Section */}
        <div className="marketplace">
          <h2 className='text'>MARKETPLACE</h2>
          <div className="button-container">
          <Link to="/buy" className="button" style={{ backgroundImage: 'url(https://i.pinimg.com/736x/90/a5/47/90a5472a138204941f2d9d2531c7198a.jpg)' }}>
              <span className="button-link">BUY</span>
            </Link>
            <Link to="/sell" className="button" style={{ backgroundImage: 'url(https://i.pinimg.com/736x/f9/5e/9f/f95e9facaf58d2a0cffdb2b521b316f5.jpg)' }}>
              <span className="button-link">SELL</span>
            </Link>
          </div>
        </div>

        {/* Carpooling Section */}
        <div className="carpooling">
          <h2 className='text'>CARPOOLING</h2>
          <div className="button-container">
          <Link to="/view-trips" className="button" style={{ backgroundImage: 'url(https://i.pinimg.com/736x/ec/9f/5e/ec9f5e9e32953c9ce63115d0a4aa7b2d.jpg)' }}>
              <span className="button-link">VIEW TRIPS</span>
            </Link>
            <Link to="/add-trip" className="button" style={{ backgroundImage: 'url(https://i.pinimg.com/736x/70/16/fe/7016fe720dd093b168c00c5e083893fe.jpg)' }}>
              <span className="button-link">ADD A TRIP</span>
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <div className="about-content">
          <h2 className="abttext">About Us</h2>
          <p className="about-text">
            Welcome to the IIT Dharwad Student Platform! This platform is designed to help students
            buy and sell used items and coordinate carpooling efficiently. Whether you're looking for
            textbooks, furniture, or a ride to campus, we've got you covered.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;