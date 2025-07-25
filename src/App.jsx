// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Layout from './components/Layout';
// import LandingPage from './pages/LandingPage';
// import SignupForm from './pages/SignupForm';
// import LoginForm from './pages/LoginForm';
// import DispatcherDashboard from './pages/DispatcherDashboard';
// import LiveMapView from './pages/LiveMapView';
// import Analytics from './pages/Analytics';
// import {AuthProvider, useAuth } from './context/auth.jsx';

// function Protected({ children }) {
//   const { currentUser } = useAuth();

//   if (currentUser === undefined) {
//     return <div>Loading...</div>;
//   }

//   return currentUser ? children : <Navigate to="/login" replace />;
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Layout>
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/signup" element={<SignupForm />} />
//             <Route path="/login" element={<LoginForm />} />
//             <Route path="/dispatcher" element={<Protected><DispatcherDashboard /></Protected>} />
//             <Route path="/live-map" element={<LiveMapView />} />
//             <Route path="/analytics" element={<Analytics />} />
//           </Routes>
//         </Layout>
//       </Router>
//     </AuthProvider>
//   );
// }




import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import DispatcherDashboard from './pages/DispatcherDashboard';
import LiveMapView from './pages/LiveMapView';
import Analytics from './pages/Analytics';
import {AuthProvider, useAuth } from './context/auth.jsx';

function Protected({ children }) {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return <div>Loading...</div>;
  }

  return currentUser ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dispatcher" element={<DispatcherDashboard/>} />
            <Route path="/live-map" element={<LiveMapView />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
