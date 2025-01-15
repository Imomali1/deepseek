import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    // Redirect to /login if not authenticated
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  
    // Render the nested routes if authenticated
    return <Outlet />;
};