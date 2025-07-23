import React, { useState } from "react";
import Map, { Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";


// Never commit your .env file to public 
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;


export default function MapView() {
  const [viewState, setViewState] = useState({
    longitude: 77.5946, // Example: Bangalore
    latitude: 12.9716,
    zoom: 12
  });

  return (
    <div style={{ width: "100%", height: "450px" }}>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={viewState}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ width: "100%", height: "100%" }}
        onMove={evt => setViewState(evt.viewState)}
      >
        {/* Optional: Current location control */}
        <GeolocateControl position="top-left" />
        {/* Optional: Mapbox navigation controls (zoom/rotate) */}
        <NavigationControl position="top-right" />
        {/* Example: Add a marker */}
        <Marker longitude={77.5946} latitude={12.9716} color="red" />
      </Map>
    </div>
  );
}
