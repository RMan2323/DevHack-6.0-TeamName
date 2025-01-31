import React, { useState, useEffect } from "react";
import { loadMapScript, initializeMap } from "../components/MapUtil";
import "./AddTripPage.css";

const AddTrip = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [stops, setStops] = useState([]);
  const [stopInput, setStopInput] = useState(""); // Input for adding stops
  const [tripDate, setTripDate] = useState(""); // Input for trip date
  const [tripTime, setTripTime] = useState(""); // Input for trip time

  useEffect(() => {
    const cleanupScript = loadMapScript(() => {
      const mapElement = document.getElementById("map");
      initializeMap(
        mapElement,
        source,
        destination,
        stops // Pass stops for routing
      );
    });

    return cleanupScript;
  }, [source, destination, stops]);

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
      // You can save the route here
      alert("Route Saved!");
      setSource("");
      setDestination("");
      setStops([]);
      setTripDate("");
      setTripTime("");
    } else {
      alert("Please provide source, destination, date, and time.");
    }
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

      <button onClick={handleSaveRoute} className="save-route-btn">
        Save Route
      </button>

      {stops.length > 0 && (
        <div className="stops-list">
          <h3>Stops:</h3>
          <ul>
            {stops.map((stop, index) => (
              <li key={index}>{stop}</li>
            ))}
          </ul>
        </div>
      )}

      <div id="map" className="map-container"></div>
    </div>
  );
};

export default AddTrip;
