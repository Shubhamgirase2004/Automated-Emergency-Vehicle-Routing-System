import React, { useState, useEffect, useCallback } from "react";
import Map, { Marker, NavigationControl, GeolocateControl, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1Ijoic2h1YmgtZ2lyYXNlMjciLCJhIjoiY21iYXd2YzdwMTEyMzJxc2NrYWQ1d3FkcSJ9.Z1yFrzGl6zUwixA3Zr-P4A"; // Replace with your token

export default function MapView() {
  const [viewState, setViewState] = useState({
    longitude: 77.5946, // Example: Bangalore
    latitude: 12.9716,
    zoom: 12
  });

  const [userLocation, setUserLocation] = useState({ longitude: 77.5946, latitude: 12.9716 });
  const [vehicles, setVehicles] = useState([]);
  const [geofenceRadius] = useState(0.003); // ~300 meters

  // Initialize vehicles around user location
  useEffect(() => {
    const nearbyVehicles = [
      {
        id: 'V001',
        type: 'civilian',
        latitude: 12.9716 + 0.001, // ~100m north
        longitude: 77.5946 + 0.001,
        color: '#2563eb',
        icon: "🚗",
        notified: false,
        distance: "100m"
      },
      {
        id: 'V002',
        type: 'emergency',
        latitude: 12.9716 - 0.0008, // ~80m south
        longitude: 77.5946 + 0.0005,
        color: '#dc2626',
        icon: "🚑",
        notified: false,
        distance: "80m"
      },
      {
        id: 'V003',
        type: 'civilian',
        latitude: 12.9716 + 0.0015, // ~150m northeast
        longitude: 77.5946 + 0.0012,
        color: '#16a34a',
        icon: "🚗",
        notified: false,
        distance: "150m"
      },
      {
        id: 'V004',
        type: 'civilian',
        latitude: 12.9716 - 0.005, // ~500m south (outside geofence)
        longitude: 77.5946 - 0.004,
        color: '#ca8a04',
        icon: "🚙",
        notified: false,
        distance: "500m"
      }
    ];

    setVehicles(nearbyVehicles);
  }, []);

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }, []);

  // Check and update geofencing notifications
  const updateGeofencing = useCallback(() => {
    const geofenceRadiusMeters = 300; // 300 meters

    setVehicles(prevVehicles => 
      prevVehicles.map(vehicle => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          vehicle.latitude,
          vehicle.longitude
        );

        const isWithinGeofence = distance <= geofenceRadiusMeters;
        
        return {
          ...vehicle,
          notified: isWithinGeofence,
          actualDistance: Math.round(distance)
        };
      })
    );
  }, [userLocation, calculateDistance]);

  // Update geofencing every 2 seconds
  useEffect(() => {
    const interval = setInterval(updateGeofencing, 2000);
    return () => clearInterval(interval);
  }, [updateGeofencing]);

  // Geofence circle data for Mapbox
  const geofenceData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [userLocation.longitude, userLocation.latitude]
        },
        properties: {
          radius: geofenceRadius * 111000 // Convert degrees to meters approximately
        }
      }
    ]
  };

  const geofenceCircleLayer = {
    id: 'geofence-circle',
    type: 'circle',
    paint: {
      'circle-radius': {
        stops: [
          [0, 0],
          [20, 300] // Adjust radius based on zoom
        ],
        base: 2
      },
      'circle-color': '#ff0000',
      'circle-opacity': 0.1,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ff0000',
      'circle-stroke-opacity': 0.4
    }
  };

  return (
    <div style={{ width: "100%", height: "450px", position: "relative" }}>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={viewState}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ width: "100%", height: "100%" }}
        onMove={evt => setViewState(evt.viewState)}
      >
        {/* Geofence Circle */}
        <Source id="geofence" type="geojson" data={geofenceData}>
          <Layer {...geofenceCircleLayer} />
        </Source>

        {/* Optional: Current location control */}
        <GeolocateControl position="top-left" />
        {/* Optional: Mapbox navigation controls (zoom/rotate) */}
        <NavigationControl position="top-right" />
        
        {/* User location marker (Emergency Center) */}
        <Marker longitude={userLocation.longitude} latitude={userLocation.latitude} anchor="center">
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#FF0000',
              border: '4px solid #fff',
              boxShadow: '0 0 0 3px #FF0000, 0 0 20px rgba(255,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Emergency Alert Center"
          >
            📍
          </div>
        </Marker>

        {/* Vehicle markers */}
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            longitude={vehicle.longitude}
            latitude={vehicle.latitude}
            anchor="center"
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: vehicle.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '16px',
                boxShadow: vehicle.notified 
                  ? '0 0 0 4px rgba(0,255,0,0.4), 0 2px 8px rgba(0,0,0,0.3)' 
                  : '0 2px 4px rgba(0,0,0,0.2)',
                border: vehicle.notified ? '3px solid #00FF00' : '2px solid #fff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              title={`${vehicle.type} - ${vehicle.id} (${vehicle.actualDistance || vehicle.distance}m)`}
            >
              {vehicle.icon}
              {/* Notification indicator */}
              {vehicle.notified && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#00FF00',
                    border: '2px solid #fff',
                    boxShadow: '0 0 4px rgba(0,255,0,0.8)',
                  }}
                />
              )}
            </div>
          </Marker>
        ))}
      </Map>

      {/* Geofencing Status Panel */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        minWidth: '200px',
        zIndex: 1000
      }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold' }}>
          Geofencing Status
        </h4>
        <div style={{ fontSize: '12px', color: '#666' }}>
          <div style={{ marginBottom: '5px' }}>
            Radius: 300m
          </div>
          <div style={{ marginBottom: '5px' }}>
            Total Vehicles: {vehicles.length}
          </div>
          <div style={{ color: '#00aa00', fontWeight: 'bold' }}>
            Notified: {vehicles.filter(v => v.notified).length}
          </div>
        </div>
      </div>
    </div>
  );
}
