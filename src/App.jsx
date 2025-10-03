import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import SignupForm from './pages/SignupForm';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import DispatcherDashboard from './pages/DispatcherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LiveMapView from './pages/LiveMapView';
import Analytics from './pages/Analytics';
import { AuthProvider } from './context/auth';
import { ProtectedUser, ProtectedAdmin } from './ProtectedRoutes';
import Users from './pages/Users';
import Alerts from './pages/Alerts';

// Import your new admin pages here:
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import ReportDetail from './pages/ReportDetail';
import ManageAccounts from './pages/ManageAccounts';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Existing routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login/user" element={<UserLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/dispatcher" element={<ProtectedUser><DispatcherDashboard /></ProtectedUser>} />
            <Route path="/admin-dashboard" element={<ProtectedAdmin><AdminDashboard /></ProtectedAdmin>} />
            <Route path="/live-map" element={<LiveMapView />} />
            <Route path="/analytics" element={<Analytics />} />

            {/* Add these new admin panel/report routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:id" element={<ReportDetail />} />
            <Route path="/accounts" element={<ManageAccounts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
