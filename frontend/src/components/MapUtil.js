// MapUtil.js
let mapScriptLoaded = false;

export const loadMapScript = (callback) => {
  // If script is already loaded, call callback immediately
  if (window.google && window.google.maps) {
    console.log("Google Maps already loaded");
    callback();
    return () => {};
  }

  // Prevent multiple script loads
  if (mapScriptLoaded) {
    return () => {};
  }

  const script = document.createElement("script");
  script.src = "https://maps.gomaps.pro/maps/api/js?key=AlzaSy_t4BpD6uVwj0bWyw_gfoxVxpAz_YzlzrG&libraries=places&callback=initMap";
  script.async = true;
  script.defer = true;

  // Global callback to prevent multiple initializations
  window.initMap = () => {
    console.log("Google Maps script loaded successfully");
    mapScriptLoaded = true;
    
    // Verify Maps and Places libraries are available
    if (window.google && window.google.maps && window.google.maps.places) {
      callback();
    } else {
      console.error("Google Maps or Places library not fully loaded");
    }
  };

  document.body.appendChild(script);

  script.onerror = (error) => {
    console.error("Failed to load Google Maps script", error);
    mapScriptLoaded = false;
  };

  // Add a timeout to catch loading issues
  const scriptLoadTimeout = setTimeout(() => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps script failed to load within the expected time");
    }
  }, 10000); // 10 seconds timeout

  return () => {
    // Cleanup function
    clearTimeout(scriptLoadTimeout);
    if (script.parentNode) {
      document.body.removeChild(script);
    }
    mapScriptLoaded = false;
  };
};

export const initializeMap = (
  mapElement,
  source,
  destination,
  setSource,
  setDestination,
  setStopInput,
  setStops
) => {
  // Create map instance
  const map = new window.google.maps.Map(mapElement, {
    center: { lat: 15.48745, lng: 74.93446 }, // Default center
    zoom: 13,
  });

  // Create directions renderer
  const directionsRenderer = new window.google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  // Autocomplete for source
  const sourceInput = document.getElementById("pac-input-source");
  const sourceAutocomplete = new window.google.maps.places.Autocomplete(sourceInput, {
    types: ['geocode'],
    fields: ['formatted_address', 'geometry']
  });
  sourceAutocomplete.bindTo("bounds", map);

  sourceAutocomplete.addListener("place_changed", () => {
    const place = sourceAutocomplete.getPlace();
    if (place.geometry && place.formatted_address) {
      map.fitBounds(place.geometry.viewport);
      setSource(place.formatted_address);
    }
  });

  // Autocomplete for destination
  const destinationInput = document.getElementById("pac-input-destination");
  const destinationAutocomplete = new window.google.maps.places.Autocomplete(destinationInput, {
    types: ['geocode'],
    fields: ['formatted_address', 'geometry']
  });
  destinationAutocomplete.bindTo("bounds", map);

  destinationAutocomplete.addListener("place_changed", () => {
    const place = destinationAutocomplete.getPlace();
    if (place.geometry && place.formatted_address) {
      map.fitBounds(place.geometry.viewport);
      setDestination(place.formatted_address);
    }
  });

  // Autocomplete for stop
  const stopInput = document.getElementById("pac-input-stop");
  const stopAutocomplete = new window.google.maps.places.Autocomplete(stopInput, {
    types: ['geocode'],
    fields: ['formatted_address', 'geometry']
  });
  stopAutocomplete.bindTo("bounds", map);

  stopAutocomplete.addListener("place_changed", () => {
    const place = stopAutocomplete.getPlace();
    if (place.geometry && place.formatted_address) {
      const formattedAddress = place.formatted_address;
      setStopInput(formattedAddress);

      // Add marker for the selected stop
      const marker = new window.google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
      });

      // Center the map to the selected stop
      map.setCenter(place.geometry.location);
    }
  });

  return map;
};