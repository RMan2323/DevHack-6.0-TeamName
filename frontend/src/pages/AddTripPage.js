import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTripPage.css';

const AddTripPage = () => {
  const [trip, setTrip] = useState({
    destination: '',
    date: '',
    seatsAvailable: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/carpool-trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trip),
      });
      if (response.ok) {
        alert('Trip added successfully!');
        navigate('/view-trips');
      } else {
        alert('Failed to add trip.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-trip-page">
      <h1>Add a Trip</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Destination:
          <input type="text" name="destination" value={trip.destination} onChange={handleChange} required />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={trip.date} onChange={handleChange} required />
        </label>
        <label>
          Seats Available:
          <input type="number" name="seatsAvailable" value={trip.seatsAvailable} onChange={handleChange} required />
        </label>
        <button type="submit">Add Trip</button>
      </form>
    </div>
  );
};

export default AddTripPage;