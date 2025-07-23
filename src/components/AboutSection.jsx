import React from 'react';
import { AlertTriangle, Cpu, Cloud, Smartphone } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The Problem & Our Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Emergency response is critical, but traffic congestion causes delays that cost lives. 
            Our AI-powered system provides a software-only solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Problem */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <h3 className="text-2xl font-bold text-gray-900">The Problem</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700">
                  <strong>Traffic Congestion:</strong> Emergency vehicles lose precious minutes 
                  navigating through heavy traffic, especially in urban areas.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700">
                  <strong>Poor Communication:</strong> Civilian drivers are often unaware of 
                  approaching emergency vehicles until it's too late to clear the path.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700">
                  <strong>Infrastructure Costs:</strong> Traditional solutions require expensive 
                  hardware installations and maintenance across entire cities.
                </p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Cpu className="h-8 w-8 text-blue-500" />
              <h3 className="text-2xl font-bold text-gray-900">Our Solution</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <div className="flex items-start space-x-3">
                  <Cloud className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-blue-700 font-medium">Software-Only Approach</p>
                    <p className="text-blue-600 text-sm mt-1">
                      Uses live GPS data, traffic APIs, and cloud computing - no physical sensors required.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <div className="flex items-start space-x-3">
                  <Smartphone className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-blue-700 font-medium">Real-Time Notifications</p>
                    <p className="text-blue-600 text-sm mt-1">
                      Push notifications to civilian vehicles and traffic police for immediate route clearance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-blue-700 font-medium">AI-Powered Optimization</p>
                    <p className="text-blue-600 text-sm mt-1">
                      Machine learning algorithms predict traffic patterns and optimize routes in real-time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Key Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">60%</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Faster Response</h4>
              <p className="text-gray-600">
                Reduction in emergency response time through optimized routing
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">₹0</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Infrastructure Cost</h4>
              <p className="text-gray-600">
                No hardware installation or maintenance required
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">100%</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Scalable</h4>
              <p className="text-gray-600">
                Easily deployable across any city or region
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default AboutSection;
