import React, { useState, useEffect, useRef } from 'react';
import { loadMapScript } from './MapUtil'; // Adjust the path if necessary
import './TripCard.css';

const TripCard = ({ trip }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [stopRequest, setStopRequest] = useState("");
  const inputRef = useRef(null);

  const handleCardClick = (e) => {
    if (inputRef.current && inputRef.current.contains(e.target)) {
      return;
    }
    setIsDetailsVisible(!isDetailsVisible);
  };

  const handleStopRequestChange = (e) => {
    setStopRequest(e.target.value);
  };

  const handleSubmitStopRequest = () => {
    if (stopRequest) {
      console.log("Stop request submitted for:", stopRequest);
      setStopRequest("");
    } else {
      alert("Please enter a stop location.");
    }
  };

  useEffect(() => {
    const cleanupScript = loadMapScript(() => {
      // Initialize autocomplete for stop location in TripCard
      const stopInput = inputRef.current;
      const stopAutocomplete = new window.google.maps.places.Autocomplete(stopInput);
      
      stopAutocomplete.addListener("place_changed", () => {
        const place = stopAutocomplete.getPlace();
        if (place.geometry) {
          setStopRequest(place.formatted_address);
        }
      });
    });

    return cleanupScript;
  }, []); 

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
              ref={inputRef} 
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
