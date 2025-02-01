// MapUtil.js
export const loadMapScript = (callback) => {
  const script = document.createElement("script");
  script.src =
    "https://maps.gomaps.pro/maps/api/js?key=AlzaSy_t4BpD6uVwj0bWyw_gfoxVxpAz_YzlzrG&libraries=places&callback=initMap";
  script.async = true;
  script.defer = true;
  window.initMap = callback; // Ensure initMap is globally available
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
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
  const map = new window.google.maps.Map(mapElement, {
    center: { lat: 15.48745, lng: 74.93446 }, // Default center
    zoom: 13,
  });

  const directionsRenderer = new window.google.maps.DirectionsRenderer();
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

  // Autocomplete for source
  const sourceInput = document.getElementById("pac-input-source");
  const sourceAutocomplete = new window.google.maps.places.Autocomplete(sourceInput);
  sourceAutocomplete.bindTo("bounds", map);

  sourceAutocomplete.addListener("place_changed", () => {
    const place = sourceAutocomplete.getPlace();
    if (place.geometry) {
      map.fitBounds(place.geometry.viewport);
      setSource(place.formatted_address);
      if (destination) {
        fetchDirections(place.formatted_address, destination);
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
      map.fitBounds(place.geometry.viewport);
      setDestination(place.formatted_address);
      if (source) {
        fetchDirections(source, place.formatted_address);
      }
    }
  });

  // Autocomplete for stop (near the route or added stops)
  const stopInput = document.getElementById("pac-input-stop");
  const stopAutocomplete = new window.google.maps.places.Autocomplete(stopInput);
  stopAutocomplete.bindTo("bounds", map);

  stopAutocomplete.addListener("place_changed", () => {
    const place = stopAutocomplete.getPlace();
    if (place.geometry) {
      setStopInput(place.formatted_address);

      // Optionally, add marker for the selected stop
      const marker = new window.google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
      });

      // Center the map to the selected stop
      map.setCenter(place.geometry.location);
    }
  });
};
