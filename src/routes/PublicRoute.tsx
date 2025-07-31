import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { ROUTE } from '@/constants/routes';
import type { JSX } from 'react';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (user) {
    const from = location.state?.from;
    return <Navigate to={from || ROUTE.MAIN} replace />;
  }

  return children;
};

export default PublicRoute;
