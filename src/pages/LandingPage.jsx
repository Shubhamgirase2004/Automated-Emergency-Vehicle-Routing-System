import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';

const LandingPage = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
    </div>
  );
};

export default LandingPage;
