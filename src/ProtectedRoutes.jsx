import { useAuth } from './context/auth';
import { Navigate } from 'react-router-dom';

export function ProtectedUser({ children }) {
  const { user } = useAuth();
  if (user === null) return <div>Loading...</div>;
  return user?.role === 'user' ? children : <Navigate to="/login/user" replace />;
}

export function ProtectedAdmin({ children }) {
  const { user } = useAuth();
  if (user === null) return <div>Loading...</div>;
  return user?.role === 'admin' ? children : <Navigate to="/login/admin" replace />;
}
