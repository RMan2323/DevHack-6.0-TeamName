import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const cleanupScript = loadMapScript(() => {
      const mapElement = document.getElementById("map");
      initializeMap(
        mapElement,
        source,
        destination,
        setSource,
        setDestination,
        setStopInput,
        setStops
      );
    });
  
    return cleanupScript;
  }, []); // Initialize map only once on component mount
  
  useEffect(() => {
    if (source && destination) {
      const mapElement = document.getElementById("map");
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      const map = new window.google.maps.Map(mapElement, {
        center: { lat: 15.48745, lng: 74.93446 }, // Default center
        zoom: 13,
      });
      directionsRenderer.setMap(map);
  
      const fetchDirections = (origin, dest) => {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRequest = {
          origin: origin,
          destination: dest,
          travelMode: window.google.maps.TravelMode.DRIVING,
        };
  
        directionsService.route(directionsRequest, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error("Directions request failed due to " + status);
          }
        });
      };
  
      fetchDirections(source, destination); // Fetch directions when source/destination changes
    }
  }, [source, destination]); // Re-fetch directions when source or destination changes

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

  const handleSaveRoute = () => {
    if (source && destination && tripDate && tripTime && numberOfPeople && fare) {
      const newRoute = {
        source,
        destination,
        stops,
        tripDate,
        tripTime,
        numberOfPeople,
        fare,
      };
      setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
      setSource("");
      setDestination("");
      setStops([]);
      setTripDate("");
      setTripTime("");
      setNumberOfPeople("");
      setFare("");
    } else {
      alert("Please provide all details (source, destination, date, time, people, fare).");
    }
  };

  const handleSelectRoute = (index) => {
    setSelectedRouteIndex(index);
    const selectedRoute = routes[index];
    setSource(selectedRoute.source);
    setDestination(selectedRoute.destination);
    setStops(selectedRoute.stops);
    setTripDate(selectedRoute.tripDate);
    setTripTime(selectedRoute.tripTime);
    setNumberOfPeople(selectedRoute.numberOfPeople);
    setFare(selectedRoute.fare);
    setIsEditing(true); // Enable editing mode
  };

  const handleSaveEditedRoute = () => {
    if (selectedRouteIndex !== null) {
      const updatedRoutes = [...routes];
      updatedRoutes[selectedRouteIndex] = {
        source,
        destination,
        stops,
        tripDate,
        tripTime,
        numberOfPeople,
        fare,
      };
      setRoutes(updatedRoutes);
      setIsEditing(false); // Disable editing mode
    }
  };

  // Function to render the route details in the desired format
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

      <button onClick={handleSaveRoute} className="save-route-btn">
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
              <strong>Route {index + 1}:</strong> {route.source} to {route.destination} (
              {route.stops.length} stops)
            </p>
            <p>
              <strong>Date:</strong> {route.tripDate} | <strong>Time:</strong> {route.tripTime}
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
