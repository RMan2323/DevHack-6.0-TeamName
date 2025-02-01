// pages/ViewTripsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Update to useNavigate for navigation
import TripCard from '../components/TripCard';
import './ViewTripsPage.css';

const ViewTripsPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Dummy trip data
  const trips = [
    {
      source: 'IIT Dharwad',
      destination: 'Hubli',
      date: '2025-02-05',
      time: '8:00 AM',
      people: 3,
      fare: 100,
    },
    {
      source: 'IIT Dharwad',
      destination: 'Dharwad City',
      date: '2025-02-06',
      time: '6:00 PM',
      people: 2,
      fare: 50,
    },
    {
      source: 'Hubli',
      destination: 'IIT Dharwad',
      date: '2025-02-07',
      time: '7:30 AM',
      people: 4,
      fare: 120,
    },
  ];

  // Handle redirection to AddTripPage
  const handleAddTripRedirect = () => {
    navigate('/add-trip'); // Redirect to AddTripPage (Make sure your routing is configured correctly)
  };

  return (
    <div className="view-trips">
      <h2 className="view-trips-title">Available Carpool Trips</h2>
      <div className="trip-cards">
        {trips.map((trip, index) => (
          <TripCard key={index} trip={trip} />
        ))}
      </div>
      <button onClick={handleAddTripRedirect} className="add-trip-btn">
        Don't see the trip you want? Add your own trip!
      </button>
    </div>
  );
};

export default ViewTripsPage;
