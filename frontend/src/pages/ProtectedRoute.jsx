import { Navigate } from 'react-router-dom';
import { getToken, getProfileFromStorage } from '../api';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = getToken();
  const profile = getProfileFromStorage();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
