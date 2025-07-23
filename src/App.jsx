import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import DispatcherDashboard from './pages/DispatcherDashboard';
import LiveMapView from './pages/LiveMapView';
import Analytics from './pages/Analytics';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dispatcher" element={<DispatcherDashboard />} />
          <Route path="/live-map" element={<LiveMapView />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
