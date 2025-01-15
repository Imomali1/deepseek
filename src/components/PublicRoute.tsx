import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PublicRoute = () => {
    const { isAuthenticated } = useAuth();

    // Redirect to /dashboard if authenticated
    if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }
  
    // Render the nested routes if not authenticated
    return <Outlet />;
};