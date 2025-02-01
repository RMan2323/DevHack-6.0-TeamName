import React, { useState, useEffect, useRef } from 'react';
import { loadMapScript } from './MapUtil'; // Adjust the path if necessary
import './TripCard.css';

const TripCard = ({ trip }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [stopRequest, setStopRequest] = useState("");
  const inputRef = useRef(null);

  const handleCardClick = (e) => {
    if (inputRef.current && inputRef.current.contains(e.target)) {
      return; // Don't toggle details if clicked inside input
    }
    setIsDetailsVisible(!isDetailsVisible); // Toggle trip details visibility
  };

  const handleStopRequestChange = (e) => {
    setStopRequest(e.target.value); // Update stop request as user types
  };

  const handleSubmitStopRequest = () => {
    if (stopRequest) {
      console.log("Stop request submitted for:", stopRequest);
      setStopRequest(""); // Clear the stop request input after submission
    } else {
      alert("Please enter a stop location.");
    }
  };

  useEffect(() => {
    if (isDetailsVisible) {
      const cleanupScript = loadMapScript(() => {
        const stopInput = inputRef.current;
        if (stopInput && window.google) {
          const autocomplete = new window.google.maps.places.Autocomplete(stopInput, {
            types: ['geocode'], // Restrict to geographic locations
          });
  
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
              setStopRequest(place.formatted_address); // Update stop request with selected place
            }
          });
  
          console.log("Autocomplete initialized"); // Add this line for debugging
        }
      });
  
      return cleanupScript;
    }
  }, [isDetailsVisible]); // Reinitialize autocomplete when isDetailsVisible changes

  return (
    <div className="trip-card" onClick={handleCardClick}>
      <div className="trip-card-details">
        <h3>{trip.source} to {trip.destination}</h3>
        <p><strong>Date:</strong> {trip.date}</p>
        <p><strong>Time:</strong> {trip.time}</p>
        <p><strong>People:</strong> {trip.people} people</p>
        <p><strong>Fare:</strong> ₹{trip.fare}</p>
      </div>

      {isDetailsVisible && (
        <div className="trip-details">
          <h4>Trip Details:</h4>
          <div className="stop-request-container">
            <input
              ref={inputRef} // Attach ref to the input field for autocomplete
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