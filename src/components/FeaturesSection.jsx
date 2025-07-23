import React from 'react';
import { 
  Navigation, 
  Smartphone, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3,
  MapPin,
  Clock
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Navigation,
      title: 'Real-Time Route Optimization',
      description: 'AI algorithms analyze traffic patterns and suggest optimal routes for emergency vehicles in real-time.',
      color: 'bg-blue-500'
    },
    {
      icon: Smartphone,
      title: 'Civilian Push Notifications',
      description: 'Instant alerts to civilian vehicles in the emergency route to clear the path immediately.',
      color: 'bg-green-500'
    },
    {
      icon: Shield,
      title: 'Traffic Authority Alerts',
      description: 'Automatic notifications to traffic police stations for manual intervention when needed.',
      color: 'bg-red-500'
    },
    {
      icon: Zap,
      title: 'No Hardware Dependency',
      description: 'Complete software solution using existing GPS infrastructure and mobile networks.',
      color: 'bg-yellow-500'
    },
    {
      icon: Globe,
      title: 'Scalable Deployment',
      description: 'Easy deployment across cities of any size with minimal setup and configuration.',
      color: 'bg-purple-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics for monitoring system performance and response times.',
      color: 'bg-indigo-500'
    },
    {
      icon: MapPin,
      title: 'Live GPS Tracking',
      description: 'Real-time tracking of emergency vehicles with precise location updates.',
      color: 'bg-pink-500'
    },
    {
      icon: Clock,
      title: 'Priority Management',
      description: 'Multi-level priority system ensuring critical emergencies get immediate attention.',
      color: 'bg-teal-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Emergency Response
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive system provides everything needed for efficient emergency vehicle 
            route management without requiring any physical infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Technology Stack
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚛️</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Frontend</h4>
              <p className="text-gray-600">React.js, TypeScript, Tailwind CSS</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Backend</h4>
              <p className="text-gray-600">Node.js, Express.js, WebSocket</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☁️</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Cloud</h4>
              <p className="text-gray-600">Firebase, Google Maps API, AWS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
