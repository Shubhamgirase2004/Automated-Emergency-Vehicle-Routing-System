import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [vehiclePosition, setVehiclePosition] = useState({ x: 0, y: 0 });

  const isAuthenticated = !!localStorage.getItem('token'); // ✅ check JWT token presence

  useEffect(() => {
    const interval = setInterval(() => {
      setVehiclePosition((prev) => ({
        x: (prev.x + 1) % 100,
        y: 45 + Math.sin(prev.x * 0.1) * 5,
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-blue-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              <span className="text-red-600">Automated</span> Emergency Vehicle{' '}
              <span className="text-blue-600">Route Clearance</span> System
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl">
              A smart, sensor-free approach to faster emergency response. 
              Revolutionizing how emergency vehicles navigate through traffic 
              using AI-powered route optimization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={isAuthenticated ? '/dispatcher' : '/signup'} // ✅ redirect logic
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Real-time Processing
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                Zero Hardware Required
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                City-wide Scalable
              </div>
            </div>
          </div>

          {/* 🚑 Emergency Vehicle Animation Section */}
          <div className="relative">
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-red-100 rounded-2xl overflow-hidden shadow-2xl">

              {/* Grid Overlay */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-6 grid-rows-6 h-full">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border border-gray-300" />
                  ))}
                </div>
              </div>

              {/* Roads */}
              <div className="absolute inset-0">
                <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-600 transform -translate-y-1/2" />
                <div className="absolute top-0 left-1/2 w-2 h-full bg-gray-600 transform -translate-x-1/2" />
              </div>

              {/* Emergency Vehicle */}
              <div
                className="absolute w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-100 ease-linear shadow-lg"
                style={{
                  left: `${vehiclePosition.x}%`,
                  top: `${vehiclePosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                🚑
              </div>

              {/* Route Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-red-300 transform -translate-y-1/2 opacity-60" />

              {/* Civilian Vehicles */}
              <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-blue-500 rounded transform -translate-y-1/2 animate-pulse" />
              <div className="absolute top-1/2 left-3/4 w-4 h-4 bg-green-500 rounded transform -translate-y-1/2 animate-pulse" />

              {/* Notifications */}
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 text-xs animate-bounce">
                <div className="text-red-600 font-semibold">Emergency Alert</div>
                <div className="text-gray-500">Clear right lane</div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-500">Route Efficiency</div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4">
              <div className="text-2xl font-bold text-blue-600">2.3min</div>
              <div className="text-sm text-gray-500">Avg. Response</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
