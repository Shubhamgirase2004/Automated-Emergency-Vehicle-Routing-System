import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Send, 
  User, 
  Navigation,
  Truck,
  Shield,
  Heart
} from 'lucide-react';

const DispatcherDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dispatchLocation: '',
    destination: '',
    priority: '1',
    vehicleType: 'ambulance',
    incidentType: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate route generation
    setTimeout(() => {
      navigate('/live-map', { state: { dispatchData: formData } });
    }, 1000);
  };

  const priorityColors = {
    '1': 'bg-red-500 text-white',
    '2': 'bg-yellow-500 text-white',
    '3': 'bg-green-500 text-white'
  };

  const vehicleIcons = {
    ambulance: Heart,
    police: Shield,
    fire: AlertTriangle,
    rescue: Truck
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Emergency Dispatcher Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage emergency vehicle dispatching and route optimization</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dispatch Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Emergency Dispatch</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dispatchLocation" className="block text-sm font-medium text-gray-700 mb-2">
                      Dispatch Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="dispatchLocation"
                        name="dispatchLocation"
                        value={formData.dispatchLocation}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter starting location"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                      Destination
                    </label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter destination"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Type
                    </label>
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="ambulance">Ambulance</option>
                      <option value="police">Police</option>
                      <option value="fire">Fire Truck</option>
                      <option value="rescue">Rescue Vehicle</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700 mb-2">
                      Incident Type
                    </label>
                    <input
                      type="text"
                      id="incidentType"
                      name="incidentType"
                      value={formData.incidentType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., Medical Emergency, Fire, Accident"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Priority Level
                  </label>
                  <div className="flex space-x-4">
                    {[
                      { value: '1', label: 'High', description: 'Life-threatening' },
                      { value: '2', label: 'Medium', description: 'Urgent' },
                      { value: '3', label: 'Low', description: 'Routine' }
                    ].map((priority) => (
                      <label key={priority.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priority"
                          value={priority.value}
                          checked={formData.priority === priority.value}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-red-600 focus:ring-red-500"
                        />
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${priorityColors[priority.value]}`}></div>
                          <span className="text-sm font-medium text-gray-700">{priority.label}</span>
                          <span className="text-xs text-gray-500">({priority.description})</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Generate Route
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Stats and Actions */}
          <div className="space-y-6">
            {/* Active Dispatches */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Dispatches</h3>
              <div className="space-y-3">
                {[
                  { id: 'D001', type: 'ambulance', status: 'En Route', time: '3 min ago' },
                  { id: 'D002', type: 'police', status: 'Dispatched', time: '7 min ago' },
                  { id: 'D003', type: 'fire', status: 'Arrived', time: '15 min ago' }
                ].map((dispatch) => {
                  const VehicleIcon = vehicleIcons[dispatch.type];
                  return (
                    <div key={dispatch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <VehicleIcon className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{dispatch.id}</p>
                          <p className="text-xs text-gray-500">{dispatch.time}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        dispatch.status === 'En Route' ? 'bg-blue-100 text-blue-800' :
                        dispatch.status === 'Dispatched' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {dispatch.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span className="text-sm font-medium text-red-700">Emergency Alert</span>
                  </div>
                </button>
                
                <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Schedule Dispatch</span>
                  </div>
                </button>
                
                <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Navigation className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Route History</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispatcherDashboard;
