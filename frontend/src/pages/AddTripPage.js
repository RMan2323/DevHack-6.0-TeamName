import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadMapScript, initializeMap } from "../components/MapUtil";
import "./AddTripPage.css";

const AddTripPage = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [stops, setStops] = useState([]); // Array of stops
  const [stopInput, setStopInput] = useState(""); // Input for adding a stop
  const [tripDate, setTripDate] = useState(""); // Input for trip date
  const [tripTime, setTripTime] = useState(""); // Input for trip time
  const [numberOfPeople, setNumberOfPeople] = useState(""); // Number of people
  const [fare, setFare] = useState(""); // Fare per person
  const [routes, setRoutes] = useState([]); // List of all routes
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null); // Currently selected route
  const [isEditing, setIsEditing] = useState(false); // Whether the user is editing a route
  const [error, setError] = useState(null); // Error state for form submission
  const [mapInstance, setMapInstance] = useState(null); // Google Map instance
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    const cleanupScript = loadMapScript(() => {
      const mapElement = document.getElementById("map");
      const instance = initializeMap(
        mapElement,
        source,
        destination,
        setSource,
        setDestination,
        setStopInput,
        setStops
      );
      setMapInstance(instance);
    });

    return () => {
      if (mapInstance) {
        mapInstance.clearMarkers();
      }
      cleanupScript();
    };
  }, []);

  useEffect(() => {
    if (mapInstance && source && destination) {
      mapInstance.calculateAndDisplayRoute(source, destination);
    }
  }, [source, destination, mapInstance]);

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleAddStop = () => {
    if (stopInput) {
      setStops((prevStops) => [...prevStops, stopInput]);
      setStopInput("");
    }
  };

  const handleRemoveStop = (index) => {
    setStops((prevStops) => prevStops.filter((_, i) => i !== index));
  };

  const handleSaveRoute = async () => {
    // Validate all required fields
    if (!source || !destination || !tripDate || !tripTime || !numberOfPeople || !fare || !phoneNumber) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate phone number format
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    try {
      // Get the backend token from local storage
      const backendToken = localStorage.getItem('backendToken');
      
      // Validate token existence and format
      if (!backendToken) {
        setError("No authentication token found. Please log in again.");
        return;
      }

      // Ensure token starts with 'Bearer '
      const formattedToken = backendToken.startsWith('Bearer ') ? backendToken : `Bearer ${backendToken}`;

      const tripData = {
        origin: source.trim(),
        destination: destination.trim(),
        date: new Date(`${tripDate}T${tripTime}`), // Combine date and time
        seatsAvailable: parseInt(numberOfPeople, 10),
        phoneNumber: phoneNumber,
        routeStops: stops.map(stop => stop.trim()).filter(stop => stop !== ''), // Clean and filter stops
        fare: parseFloat(fare)
      };

      // Validate trip data
      const requiredFields = ['origin', 'destination', 'date', 'seatsAvailable', 'phoneNumber', 'fare'];
      for (let field of requiredFields) {
        if (!tripData[field]) {
          setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
          return;
        }
      }

      // Configure axios request with detailed error handling
      const config = {
        headers: { 
          'Authorization': formattedToken,
          'Content-Type': 'application/json'
        }
      };

      console.log('Sending trip data:', tripData);
      console.log('Token:', formattedToken);

      // Send POST request to register trip
      const response = await axios.post('/api/carpool/register', tripData, config);

      // Log success and update UI
      console.log("Trip created successfully:", response.data);
      
      // Create new route object
      const newRoute = { ...tripData };
      setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
      
      // Reset form fields
      setSource("");
      setDestination("");
      setTripDate("");
      setTripTime("");
      setNumberOfPeople("");
      setFare("");
      setPhoneNumber("");
      setStops([]);
      setError(null);

      // Optional: Show success message or navigate
      alert('Trip created successfully!');
    } catch (error) {
      // Detailed error logging
      console.error('Full error object:', error);
      
      // Log specific error details
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        
        setError(error.response.data.message || 'Failed to create trip');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', error.message);
        setError('An unexpected error occurred');
      }
    }
  };

  const validatePhoneNumber = (number) => {
    // Indian phone number validation (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneNumberChange = (e) => {
    const inputNumber = e.target.value;
    const numericInput = inputNumber.replace(/\D/g, '');
    setPhoneNumber(numericInput);

    // Validate phone number
    if (numericInput && !validatePhoneNumber(numericInput)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number');
    } else {
      setPhoneError('');
    }
  };

  const handleSelectRoute = (index) => {
    setSelectedRouteIndex(index);
    const selectedRoute = routes[index];
    setSource(selectedRoute.origin);
    setDestination(selectedRoute.destination);
    setStops(selectedRoute.routeStops);
    setTripDate(selectedRoute.date.toISOString().split('T')[0]);
    setTripTime(selectedRoute.date.toLocaleTimeString());
    setNumberOfPeople(selectedRoute.seatsAvailable.toString());
    setFare(selectedRoute.fare);
    setIsEditing(true); // Enable editing mode
  };

  const handleSaveEditedRoute = () => {
    if (selectedRouteIndex !== null) {
      const updatedRoutes = [...routes];
      updatedRoutes[selectedRouteIndex] = {
        origin: source,
        destination: destination,
        date: new Date(`${tripDate}T${tripTime}`),
        seatsAvailable: parseInt(numberOfPeople, 10),
        phoneNumber: phoneNumber,
        routeStops: stops,
        fare: parseFloat(fare)
      };
      setRoutes(updatedRoutes);
      setIsEditing(false); // Disable editing mode
    }
  };

  const renderRouteDetails = () => {
    if (!source || !destination) return null;

    return (
      <div className="route-details">
        <h2>Route Details:</h2>
        <p>
          <strong>Source:</strong> {source}
        </p>
        {stops.map((stop, index) => (
          <p key={index}>
            <strong>Stop {index + 1}:</strong> {stop}{" "}
            <button onClick={() => handleRemoveStop(index)} className="remove-stop-btn">
              Remove
            </button>
          </p>
        ))}
        <p>
          <strong>Destination:</strong> {destination}
        </p>
        <p>
          <strong>Date:</strong> {tripDate}
        </p>
        <p>
          <strong>Time:</strong> {tripTime}
        </p>
        <p>
          <strong>Number of People:</strong> {numberOfPeople}
        </p>
        <p>
          <strong>Total Fare:</strong> ₹{fare}
        </p>
      </div>
    );
  };

  return (
    <div className="home">
      <h1>Route Planner</h1>

      <div className="input-container">
        <input
          id="pac-input-source"
          type="text"
          placeholder="Enter Source"
          value={source}
          onChange={handleSourceChange}
          className="input-field"
        />
        <input
          id="pac-input-destination"
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={handleDestinationChange}
          className="input-field"
        />
      </div>

      <div className="pac-input-stop">   {/*only changed ID*/}
        <input
          id="pac-input-stop"
          type="text"
          placeholder="Search near the route or add a stop"
          value={stopInput}
          onChange={(e) => setStopInput(e.target.value)}
          className="input-field"
        />
        <button onClick={handleAddStop} className="add-stop-btn">
          Add Stop
        </button>
      </div>

      <div className="trip-datetime-container">
        <input
          type="date"
          placeholder="Select Date"
          value={tripDate}
          onChange={(e) => setTripDate(e.target.value)}
          className="input-field"
        />
        <input
          type="time"
          placeholder="Select Time"
          value={tripTime}
          onChange={(e) => setTripTime(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="people-fare-container">
        <input
          type="number"
          placeholder="Number of People"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Total fare"
          value={fare}
          onChange={(e) => setFare(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="phone-number-input">
        <label htmlFor="phone-number">Phone Number</label>
        <input
          type="tel"
          id="phone-number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter 10-digit mobile number"
          maxLength="10"
          className={phoneError ? 'input-error' : ''}
        />
        {phoneError && <p className="error-message">{phoneError}</p>}
      </div>

      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      <button 
        onClick={handleSaveRoute} 
        className="save-route-btn"
        disabled={!!phoneError || !phoneNumber}
      >
        Save Route
      </button>

      {isEditing && (
        <div className="edit-route-container">
          <h2>Edit Route</h2>
          <button onClick={handleSaveEditedRoute} className="save-edited-route-btn">
            Save Edited Route
          </button>
        </div>
      )}

      <div id="map" className="map-container"></div>

      {renderRouteDetails()}

      <div className="saved-routes">
        <h2>Saved Routes</h2>
        {routes.map((route, index) => (
          <div key={index} className="route-item">
            <p>
              <strong>Route {index + 1}:</strong> {route.origin} to {route.destination} (
              {route.routeStops.length} stops)
            </p>
            <p>
              <strong>Date:</strong> {route.date.toISOString().split('T')[0]} | <strong>Time:</strong> {route.date.toLocaleTimeString()}
            </p>
            <button onClick={() => handleSelectRoute(index)} className="select-route-btn">
              Edit Route
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddTripPage;
