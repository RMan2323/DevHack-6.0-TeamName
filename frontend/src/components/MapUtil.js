export const loadMapScript = (callback) => {
    const script = document.createElement("script");
    script.src =
      "https://maps.gomaps.pro/maps/api/js?key=AlzaSylZmBqWbt7osSeL0-K4f0NvjxWFFEI_oiT&libraries=geometry,places,directions&callback=initMap";
    script.async = true;
    script.defer = true;
    window.initMap = callback;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  };
  
  export const initializeMap = (
    mapElement,
    source,
    destination,
    stops // Array of stops
  ) => {
    const map = new window.google.maps.Map(mapElement, {
      center: { lat: 15.48745, lng: 74.93446 }, // Default center (IIT Dharwad)
      zoom: 13,
    });
  
    // Autocomplete for source
    const sourceInput = document.getElementById("pac-input-source");
    const sourceAutocomplete = new window.google.maps.places.Autocomplete(sourceInput);
    sourceAutocomplete.bindTo("bounds", map);
  
    sourceAutocomplete.addListener("place_changed", () => {
      const place = sourceAutocomplete.getPlace();
      if (place.geometry) {
        map.fitBounds(place.geometry.viewport);
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
      }
    });
  
    // Optionally handle stops or waypoints here if needed (for further enhancements)
    stops.forEach((stop) => {
      const marker = new window.google.maps.Marker({
        position: stop,
        map: map,
        title: "Stop",
      });
    });
  };
  