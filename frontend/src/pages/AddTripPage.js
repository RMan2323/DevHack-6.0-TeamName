import React, { useState, useEffect } from "react";
import { loadMapScript, initializeMap } from "../components/MapUtil";
import "./AddTripPage.css";

const Home = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [stops, setStops] = useState([]); // Array of stops
  const [stopInput, setStopInput] = useState(""); // Input for adding a stop
  const [tripDate, setTripDate] = useState(""); // Input for trip date
  const [tripTime, setTripTime] = useState(""); // Input for trip time
  const [routes, setRoutes] = useState([]); // List of all routes
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null); // Currently selected route
  const [isEditing, setIsEditing] = useState(false); // Whether the user is editing a route
  const [searchNearRoute, setSearchNearRoute] = useState(""); // Input for searching near the route

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
        setSearchNearRoute
      );
    });

    return cleanupScript;
  }, []);

  useEffect(() => {
    if (source && destination) {
      const mapElement = document.getElementById("map");
      initializeMap(
        mapElement,
        source,
        destination,
        setSource,
        setDestination,
        setStopInput,
        setSearchNearRoute
      );
    }
  }, [source, destination]);

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

  const handleSaveRoute = () => {
    if (source && destination && tripDate && tripTime) {
      const newRoute = {
        source,
        destination,
        stops,
        tripDate,
        tripTime,
      };
      setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
      setSource("");
      setDestination("");
      setStops([]);
      setTripDate("");
      setTripTime("");
    } else {
      alert("Please provide source, destination, date, and time.");
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
            <strong>Stop {index + 1}:</strong> {stop}
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

      <div className="stop-input-container">
        <input
          id="pac-input-stop"
          type="text"
          placeholder="Enter Stop"
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

      <div className="search-near-route-container">
        <input
          id="pac-input-search-near-route"
          type="text"
          placeholder="Search near the route"
          value={searchNearRoute}
          onChange={(e) => setSearchNearRoute(e.target.value)}
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

      {/* Render route details in the desired format */}
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

export default Home;