import React from 'react';
import { Github, Mail, Phone, MapPin, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold text-white">
                Emergency Route System
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              An AI-powered solution for optimizing emergency vehicle routes without physical sensors, 
              enabling faster response times and saving lives.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/emergency-route-system"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@emergency-route-system.edu"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Emergency Route System. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Developed with ❤️ for safer emergency response
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
