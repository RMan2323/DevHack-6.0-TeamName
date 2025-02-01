// components/TripCard.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api'; // Correct imports
import './TripCard.css';

const TripCard = ({ trip }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // State for toggling trip details
  const [stopRequest, setStopRequest] = useState(""); // State for holding the stop request input
  const [autocomplete, setAutocomplete] = useState(null); // State for autocomplete instance

  const handleCardClick = () => {
    setIsDetailsVisible(!isDetailsVisible); // Toggle visibility of trip details
  };

  const handleStopRequestChange = (e) => {
    setStopRequest(e.target.value); // Update the stop request input
  };

  const handleSubmitStopRequest = () => {
    if (stopRequest) {
      console.log("Stop request submitted for:", stopRequest); // Print the stop request to console (for now)
      setStopRequest(""); // Reset the stop request input field after submission
    } else {
      alert("Please enter a stop location.");
    }
  };

  useEffect(() => {
    if (autocomplete) {
      const placesService = new window.google.maps.places.PlacesService(autocomplete.getPlace());
      placesService.getDetails({}, (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log("Place details:", result);
        }
      });
    }
  }, [autocomplete]);

  return (
    <div className="trip-card" onClick={handleCardClick}>
      <div className="trip-card-details">
        <h3>{trip.source} to {trip.destination}</h3>
        <p><strong>Date:</strong> {trip.date}</p>
        <p><strong>Time:</strong> {trip.time}</p>
        <p><strong>People:</strong> {trip.people} people</p>
        <p><strong>Fare:</strong> ₹{trip.fare}</p>
      </div>

      {/* Trip Details Toggle */}
      {isDetailsVisible && (
        <div className="trip-details">
          <h4>Trip Details:</h4>
          <p><strong>Source:</strong> {trip.source}</p>
          <p><strong>Destination:</strong> {trip.destination}</p>
          <p><strong>Date:</strong> {trip.date}</p>
          <p><strong>Time:</strong> {trip.time}</p>
          <p><strong>People:</strong> {trip.people}</p>
          <p><strong>Fare:</strong> ₹{trip.fare}</p>
          
          {/* Make Stop Request */}
          <div className="stop-request-container">
            <input
              type="text"
              placeholder="Enter stop location"
              value={stopRequest}
              onChange={handleStopRequestChange}
              className="input-field"
            />
            <button onClick={handleSubmitStopRequest} className="submit-stop-request-btn">
              Make Stop Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripCard;
