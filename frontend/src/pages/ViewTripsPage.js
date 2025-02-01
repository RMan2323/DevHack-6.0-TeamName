import React, { useEffect, useState } from 'react';
import './ViewTripsPage.css';

const ViewTripsPage = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('/api/carpool-trips');
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="view-trips-page">
      <h1>Available Trips</h1>
      <div className="trip-list">
        {trips.map((trip) => (
          <div key={trip._id} className="trip-card">
            <h3>{trip.destination}</h3>
            <p>Date: {new Date(trip.date).toLocaleDateString()}</p>
            <p>Seats Available: {trip.seatsAvailable}</p>
            <button>Join Trip</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTripsPage;