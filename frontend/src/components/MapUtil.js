// MapUtil.js
let mapScriptLoaded = false;

export const loadMapScript = (callback) => {
  if (window.google && window.google.maps) {
    console.log("Google Maps already loaded");
    callback();
    return () => {};
  }

  if (mapScriptLoaded) {
    return () => {};
  }

  const script = document.createElement("script");
  script.src = "https://maps.gomaps.pro/maps/api/js?key=AlzaSy_t4BpD6uVwj0bWyw_gfoxVxpAz_YzlzrG&libraries=places&callback=initMap";
  script.async = true;
  script.defer = true;

  window.initMap = () => {
    console.log("Google Maps script loaded successfully");
    mapScriptLoaded = true;
    
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

  const scriptLoadTimeout = setTimeout(() => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps script failed to load within the expected time");
    }
  }, 10000);

  return () => {
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
    center: { lat: 15.48745, lng: 74.93446 },
    zoom: 13,
  });

  // Create directions service and renderer
  const directionsService = new window.google.maps.DirectionsService();
  const directionsRenderer = new window.google.maps.DirectionsRenderer({
    map: map,
    preserveViewport: true
  });

  // Store markers in an array
  let markers = [];

  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
  };

  const calculateAndDisplayRoute = (origin, dest) => {
    if (!origin || !dest) return;

    const request = {
      origin: origin,
      destination: dest,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        const bounds = new window.google.maps.LatLngBounds();
        result.routes[0].legs[0].steps.forEach((step) => {
          bounds.extend(step.start_location);
          bounds.extend(step.end_location);
        });
        map.fitBounds(bounds);
      } else {
        console.error("Directions request failed due to " + status);
      }
    });
  };

  // Autocomplete for source
  const sourceInput = document.getElementById("pac-input-source");
  const sourceAutocomplete = new window.google.maps.places.Autocomplete(sourceInput);
  sourceAutocomplete.bindTo("bounds", map);

  sourceAutocomplete.addListener("place_changed", () => {
    const place = sourceAutocomplete.getPlace();
    if (place.geometry) {
      setSource(place.formatted_address);
      if (destination) {
        calculateAndDisplayRoute(place.formatted_address, destination);
      }
    }
  });

  // Autocomplete for destination
  const destinationInput = document.getElementById("pac-input-destination");
  const destinationAutocomplete = new window.google.maps.places.Autocomplete(destinationInput);
  destinationAutocomplete.bindTo("bounds", map);

  destinationAutocomplete.addListener("place_changed", () => {
    const place = destinationAutocomplete.getPlace();
    if (place.geometry) {
      setDestination(place.formatted_address);
      if (source) {
        calculateAndDisplayRoute(source, place.formatted_address);
      }
    }
  });

  // Autocomplete for stop
  const stopInput = document.getElementById("pac-input-stop");
  const stopAutocomplete = new window.google.maps.places.Autocomplete(stopInput);
  stopAutocomplete.bindTo("bounds", map);

  stopAutocomplete.addListener("place_changed", () => {
    const place = stopAutocomplete.getPlace();
    if (place.geometry) {
      setStopInput(place.formatted_address);

      // Create marker for the stop
      const marker = new window.google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
        animation: window.google.maps.Animation.DROP,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
      });

      // Add marker to array
      markers.push(marker);

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><strong>${place.name || 'Stop'}</strong><br>${place.formatted_address}</div>`
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      // Adjust bounds to show both route and marker
      if (directionsRenderer.getDirections()) {
        const bounds = directionsRenderer.getDirections().routes[0].bounds;
        bounds.extend(place.geometry.location);
        map.fitBounds(bounds);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(15);
      }
    }
  });

  return {
    map,
    directionsRenderer,
    directionsService,
    calculateAndDisplayRoute,
    clearMarkers
  };
};