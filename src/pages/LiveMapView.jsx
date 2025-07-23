import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Map, { Marker, NavigationControl, GeolocateControl, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Navigation as NavigationIcon,
  Clock,
  MapPin,
  Users,
  Shield,
  Radio,
  Zap,
  AlertCircle,
  Wifi
} from 'lucide-react';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const LiveMapView = () => {
  const location = useLocation();
  const dispatchData = location.state?.dispatchData;

  const [viewState, setViewState] = useState({
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 16, // Higher zoom to see nearby vehicles better
  });

  const [userLocation, setUserLocation] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [routeProgress, setRouteProgress] = useState(0);
  const [eta, setEta] = useState(8);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [notificationPulse, setNotificationPulse] = useState({});
  const [geofenceRadius] = useState(0.003); // ~300 meters

  // Get user's current location and initialize vehicles very close by
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;
          
          setUserLocation({ latitude: userLat, longitude: userLng });
          
          setViewState({
            longitude: userLng,
            latitude: userLat,
            zoom: 16,
          });

          // Create vehicles VERY close to user's location (within 500m radius)
          const nearbyVehicles = [
            {
              id: 'EV001',
              type: 'emergency',
              latitude: userLat + 0.0005, // ~50m north
              longitude: userLng + 0.0008,
              color: '#dc2626',
              icon: "🚑",
              baseLatitude: userLat + 0.0005,
              baseLongitude: userLng + 0.0008,
              notified: false,
              distance: "50m"
            },
            {
              id: 'CV001',
              type: 'civilian',
              latitude: userLat + 0.0012, // ~120m northeast
              longitude: userLng + 0.0015,
              color: '#2563eb',
              icon: "🚗",
              baseLatitude: userLat + 0.0012,
              baseLongitude: userLng + 0.0015,
              notified: false,
              distance: "120m"
            },
            {
              id: 'CV002',
              type: 'civilian',
              latitude: userLat - 0.0008, // ~80m south
              longitude: userLng + 0.001,
              color: '#16a34a',
              icon: "🚗",
              baseLatitude: userLat - 0.0008,
              baseLongitude: userLng + 0.001,
              notified: false,
              distance: "80m"
            },
            {
              id: 'CV003',
              type: 'civilian',
              latitude: userLat - 0.001, // ~100m southwest
              longitude: userLng - 0.0012,
              color: '#ca8a04',
              icon: "🚙",
              baseLatitude: userLat - 0.001,
              baseLongitude: userLng - 0.0012,
              notified: false,
              distance: "100m"
            },
            {
              id: 'CV004',
              type: 'civilian',
              latitude: userLat + 0.002, // ~200m north
              longitude: userLng - 0.0005,
              color: '#a21caf',
              icon: "🚕",
              baseLatitude: userLat + 0.002,
              baseLongitude: userLng - 0.0005,
              notified: false,
              distance: "200m"
            },
            {
              id: 'EV002',
              type: 'emergency',
              latitude: userLat - 0.0015, // ~150m southeast
              longitude: userLng + 0.002,
              color: '#2563eb',
              icon: "🚓",
              baseLatitude: userLat - 0.0015,
              baseLongitude: userLng + 0.002,
              notified: false,
              distance: "150m"
            },
            {
              id: 'CV005',
              type: 'civilian',
              latitude: userLat + 0.0008, // ~80m northwest
              longitude: userLng - 0.002,
              color: '#e11d48',
              icon: "🚗",
              baseLatitude: userLat + 0.0008,
              baseLongitude: userLng - 0.002,
              notified: false,
              distance: "80m"
            },
            {
              id: 'EV003',
              type: 'emergency',
              latitude: userLat - 0.0005, // ~50m southwest
              longitude: userLng - 0.0008,
              color: '#16a34a',
              icon: "🚒",
              baseLatitude: userLat - 0.0005,
              baseLongitude: userLng - 0.0008,
              notified: false,
              distance: "50m"
            }
          ];

          setVehicles(nearbyVehicles);
          setLocationLoaded(true);
        },
        (error) => {
          console.error("Geolocation error:", error);
          const defaultLat = 40.7128;
          const defaultLng = -74.006;
          
          setUserLocation({ latitude: defaultLat, longitude: defaultLng });
          
          const defaultVehicles = [
            {
              id: 'EV001',
              type: 'emergency',
              latitude: defaultLat + 0.0005,
              longitude: defaultLng + 0.0008,
              color: '#dc2626',
              icon: "🚑",
              baseLatitude: defaultLat + 0.0005,
              baseLongitude: defaultLng + 0.0008,
              notified: false,
              distance: "50m"
            },
            {
              id: 'CV001',
              type: 'civilian',
              latitude: defaultLat + 0.0012,
              longitude: defaultLng + 0.0015,
              color: '#2563eb',
              icon: "🚗",
              baseLatitude: defaultLat + 0.0012,
              baseLongitude: defaultLng + 0.0015,
              notified: false,
              distance: "120m"
            },
            // Add more default vehicles similar to above...
          ];

          setVehicles(defaultVehicles);
          setLocationLoaded(true);
        }
      );
    }
  }, []);

  // Geofence circle data for Mapbox
  const geofenceData = userLocation ? {
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
  } : null;

  // Simulate geofencing notifications
  const triggerGeofenceNotification = useCallback((vehicleId) => {
    setNotificationPulse(prev => ({
      ...prev,
      [vehicleId]: true
    }));

    // Mark vehicle as notified
    setVehicles(prev => 
      prev.map(v => 
        v.id === vehicleId ? { ...v, notified: true } : v
      )
    );

    // Remove pulse effect after animation
    setTimeout(() => {
      setNotificationPulse(prev => ({
        ...prev,
        [vehicleId]: false
      }));
    }, 2000);
  }, []);

  // Simulate ongoing geofencing alerts
  useEffect(() => {
    if (!locationLoaded || vehicles.length === 0) return;

    const notificationInterval = setInterval(() => {
      // Find unnotified vehicles
      const unnotifiedVehicles = vehicles.filter(v => !v.notified);
      
      if (unnotifiedVehicles.length > 0) {
        // Notify a random unnotified vehicle
        const randomVehicle = unnotifiedVehicles[Math.floor(Math.random() * unnotifiedVehicles.length)];
        triggerGeofenceNotification(randomVehicle.id);

        // Add to notifications panel
        const alertMessages = [
          `${randomVehicle.type === 'emergency' ? 'Emergency' : 'Civilian'} vehicle ${randomVehicle.id} notified`,
          `Alert sent to ${randomVehicle.id} (${randomVehicle.distance} away)`,
          `Geofence triggered: ${randomVehicle.id} received emergency protocol`,
          `Vehicle ${randomVehicle.id} - Route clearance requested`
        ];

        const newNotification = {
          id: Date.now(),
          type: 'geofence',
          vehicleId: randomVehicle.id,
          message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
          timestamp: new Date().toLocaleTimeString(),
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      }
    }, 3000); // Send notification every 3 seconds

    return () => clearInterval(notificationInterval);
  }, [locationLoaded, vehicles, triggerGeofenceNotification]);

  // Vehicle position updates (very small movements)
  const updateVehiclePositions = useCallback(() => {
    setVehicles(prevVehicles => 
      prevVehicles.map(vehicle => {
        // Very small movement around base position (max 0.0003 degrees ≈ 30m)
        const maxOffset = 0.0003;
        const newLongitude = vehicle.baseLongitude + (Math.random() - 0.5) * maxOffset;
        const newLatitude = vehicle.baseLatitude + (Math.random() - 0.5) * maxOffset;

        const longitude = isNaN(newLongitude) ? vehicle.baseLongitude : newLongitude;
        const latitude = isNaN(newLatitude) ? vehicle.baseLatitude : newLatitude;

        return {
          ...vehicle,
          longitude: Number(longitude.toFixed(7)),
          latitude: Number(latitude.toFixed(7))
        };
      })
    );
  }, []);

  // Update progress
  const updateProgress = useCallback(() => {
    setRouteProgress(prev => {
      const newProgress = prev + 1;
      return newProgress >= 100 ? 0 : newProgress;
    });
    setEta(prev => {
      const newEta = prev - 0.05;
      return newEta <= 0 ? 8 : newEta;
    });
  }, []);

  // Vehicle animation effect
  useEffect(() => {
    if (!locationLoaded || vehicles.length === 0) return;

    const interval = setInterval(() => {
      updateVehiclePositions();
      updateProgress();
    }, 2000);

    return () => clearInterval(interval);
  }, [locationLoaded, vehicles.length, updateVehiclePositions, updateProgress]);

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <h1 className="text-xl font-semibold text-gray-900">Geofencing Emergency Alert System</h1>
              <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                Priority: {dispatchData?.priority === '1' ? 'High' : dispatchData?.priority === '2' ? 'Medium' : 'Low'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <Wifi className="inline h-4 w-4 mr-1" />
                Active Geofence
              </div>
              <div className="text-sm text-gray-600">
                <AlertCircle className="inline h-4 w-4 mr-1" />
                {vehicles.filter(v => v.notified).length}/{vehicles.length} Notified
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map View */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ height: "700px" }}>
              {!locationLoaded ? (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Initializing geofencing system...</p>
                    <p className="text-sm text-gray-500 mt-2">Please allow location access</p>
                  </div>
                </div>
              ) : MAPBOX_TOKEN ? (
                <Map
                  mapboxAccessToken={MAPBOX_TOKEN}
                  initialViewState={viewState}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  style={{ width: "100%", height: "100%" }}
                  onMove={evt => setViewState(evt.viewState)}
                >
                  <GeolocateControl position="top-left" />
                  <NavigationControl position="top-right" />

                  {/* Geofence Circle */}
                  {geofenceData && (
                    <Source id="geofence" type="geojson" data={geofenceData}>
                      <Layer {...geofenceCircleLayer} />
                    </Source>
                  )}

                  {/* User location marker (Emergency Center) */}
                  {userLocation && (
                    <Marker
                      longitude={userLocation.longitude}
                      latitude={userLocation.latitude}
                      anchor="center"
                    >
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
                          animation: 'pulse 2s infinite'
                        }}
                        title="Emergency Alert Center"
                      >
                        <AlertCircle size={12} color="#fff" />
                      </div>
                    </Marker>
                  )}

                  {/* Render all vehicle markers with notification effects */}
                  {vehicles.map((vehicle) => {
                    if (
                      !vehicle.longitude || 
                      !vehicle.latitude || 
                      isNaN(vehicle.longitude) || 
                      isNaN(vehicle.latitude)
                    ) {
                      return null;
                    }

                    const isPulsing = notificationPulse[vehicle.id];
                    const isNotified = vehicle.notified;

                    return (
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
                            boxShadow: isNotified 
                              ? '0 0 0 4px rgba(0,255,0,0.4), 0 2px 8px rgba(0,0,0,0.3)' 
                              : '0 2px 4px rgba(0,0,0,0.2)',
                            border: isNotified ? '3px solid #00FF00' : '2px solid #fff',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            transform: isPulsing ? 'scale(1.3)' : 'scale(1)',
                            animation: isPulsing ? 'pulse 0.5s ease-in-out' : 'none',
                            position: 'relative'
                          }}
                          title={`${vehicle.type} - ${vehicle.id} (${vehicle.distance})`}
                        >
                          {vehicle.icon}
                          {/* Notification indicator */}
                          {isNotified && (
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
                          {/* Pulse animation overlay */}
                          {isPulsing && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '-8px',
                                left: '-8px',
                                right: '-8px',
                                bottom: '-8px',
                                borderRadius: '50%',
                                border: '3px solid #FFD700',
                                animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                                pointerEvents: 'none'
                              }}
                            />
                          )}
                        </div>
                      </Marker>
                    );
                  })}
                </Map>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <p className="text-gray-500">Please set your MAPBOX_TOKEN in .env file</p>
                </div>
              )}
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Geofencing Status */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Geofencing Status</h3>
              {userLocation ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Geofence Active</span>
                    <span className="text-sm text-green-600 font-semibold">✓ ONLINE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Radius</span>
                    <span className="text-sm text-gray-900">300m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Vehicles in Range</span>
                    <span className="text-sm text-blue-600 font-semibold">{vehicles.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Notifications Sent</span>
                    <span className="text-sm text-green-600 font-semibold">
                      {vehicles.filter(v => v.notified).length}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Setting up geofence...</p>
              )}
            </div>

            {/* Vehicle Status */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Status</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {vehicles.map((vehicle) => (
                  <div 
                    key={vehicle.id} 
                    className={`flex items-center justify-between p-2 rounded text-sm ${
                      vehicle.notified ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{vehicle.icon}</span>
                      <span className="font-medium">{vehicle.id}</span>
                      <span className="text-gray-500">({vehicle.distance})</span>
                    </div>
                    <div className="flex items-center">
                      {vehicle.notified ? (
                        <span className="text-green-600 text-xs font-semibold">✓ NOTIFIED</span>
                      ) : (
                        <span className="text-gray-400 text-xs">PENDING</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Notifications */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Geofence Alerts</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-2 bg-gray-50 rounded">
                    <div className="w-2 h-2 rounded-full mt-2 bg-green-500 animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

const Stat = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <Icon className={`h-4 w-4 ${color}`} />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <span className="text-sm font-semibold text-gray-900">{value}</span>
  </div>
);

export default LiveMapView;
