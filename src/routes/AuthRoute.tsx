import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import type { ReactNode } from 'react';
import { ROUTE } from '@/constants/routes';

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to={ROUTE.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
