import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Navigation, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  Users, 
  Shield,
  Radio,
  Zap
} from 'lucide-react';

const LiveMapView: React.FC = () => {
  const location = useLocation();
  const dispatchData = location.state?.dispatchData;
  
  const [vehiclePosition, setVehiclePosition] = useState({ x: 10, y: 50 });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [routeProgress, setRouteProgress] = useState(0);
  const [eta, setEta] = useState(8);

  useEffect(() => {
    // Simulate vehicle movement
    const interval = setInterval(() => {
      setVehiclePosition(prev => ({
        x: Math.min(prev.x + 2, 90),
        y: 50 + Math.sin(prev.x * 0.1) * 10
      }));
      
      setRouteProgress(prev => Math.min(prev + 2, 100));
      setEta(prev => Math.max(prev - 0.2, 0));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate notifications
    const notificationInterval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: Math.random() > 0.5 ? 'civilian' : 'police',
        message: Math.random() > 0.5 ? 'Path cleared successfully' : 'Alert sent to nearby vehicles',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    }, 3000);

    return () => clearInterval(notificationInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h1 className="text-xl font-semibold text-gray-900">Live Route Tracking</h1>
              <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                Priority: {dispatchData?.priority === '1' ? 'High' : dispatchData?.priority === '2' ? 'Medium' : 'Low'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <Clock className="inline h-4 w-4 mr-1" />
                ETA: {eta.toFixed(1)} min
              </div>
              <div className="text-sm text-gray-600">
                Progress: {routeProgress.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map View */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Route Visualization</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Emergency Vehicle</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Civilian Vehicles</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50">
                {/* Map Grid */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-6 h-full">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-gray-200"></div>
                    ))}
                  </div>
                </div>

                {/* Roads */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-0 w-full h-3 bg-gray-400 transform -translate-y-1/2"></div>
                  <div className="absolute top-0 left-1/4 w-3 h-full bg-gray-400 transform -translate-x-1/2"></div>
                  <div className="absolute top-0 left-3/4 w-3 h-full bg-gray-400 transform -translate-x-1/2"></div>
                </div>

                {/* Route Path */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-red-400 transform -translate-y-1/2 opacity-80"></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-red-600 transform -translate-y-1/2 transition-all duration-500"
                  style={{ width: `${routeProgress}%` }}
                ></div>

                {/* Emergency Vehicle */}
                <div
                  className="absolute w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg transition-all duration-500"
                  style={{
                    left: `${vehiclePosition.x}%`,
                    top: `${vehiclePosition.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  🚑
                </div>

                {/* Civilian Vehicles */}
                <div className="absolute top-1/2 left-1/3 w-4 h-6 bg-blue-500 rounded transform -translate-y-1/2 opacity-60"></div>
                <div className="absolute top-1/2 left-2/3 w-4 h-6 bg-green-500 rounded transform -translate-y-1/2 opacity-60"></div>
                <div className="absolute top-1/3 left-1/2 w-4 h-6 bg-yellow-500 rounded transform -translate-x-1/2 opacity-60"></div>

                {/* Traffic Lights */}
                <div className="absolute top-1/4 left-1/4 w-2 h-6 bg-green-400 rounded transform -translate-x-1/2"></div>
                <div className="absolute top-3/4 left-3/4 w-2 h-6 bg-green-400 rounded transform -translate-x-1/2"></div>

                {/* Notification Bubbles */}
                <div className="absolute top-6 right-6 bg-white rounded-lg shadow-lg p-3 animate-bounce">
                  <div className="text-xs text-red-600 font-semibold">Alert Sent</div>
                  <div className="text-xs text-gray-500">Clear right lane</div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Route Info */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Information</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">From</p>
                    <p className="text-sm text-gray-600">{dispatchData?.dispatchLocation || 'Hospital Central'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Navigation className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">To</p>
                    <p className="text-sm text-gray-600">{dispatchData?.destination || 'Emergency Site'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">ETA</p>
                    <p className="text-sm text-gray-600">{eta.toFixed(1)} minutes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Stats */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Notified Vehicles</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Police Stations</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Radio className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-600">Traffic Lights</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-gray-600">Response Time</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">98%</span>
                </div>
              </div>
            </div>

            {/* Live Notifications */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Notifications</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-2 bg-gray-50 rounded">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === 'civilian' ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
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
    </div>
  );
};

export default LiveMapView;