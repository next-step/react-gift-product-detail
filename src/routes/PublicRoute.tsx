import { Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { ROUTE } from '@/constants/routes';
import type { JSX } from 'react';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  return user ? <Navigate to={ROUTE.MAIN} replace /> : children;
};

export default PublicRoute;
