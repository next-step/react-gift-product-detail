import { Navigate, useLocation } from 'react-router-dom';
import { useUserInfo } from '@/contexts/UserInfoContext';
import { ROUTE_PATH } from './routePath';
import { type PropsWithChildren } from 'react';

const RequireAuth = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useUserInfo();
  const location = useLocation();

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTE_PATH.LOGIN} replace state={{ from: location }} />
  );
};

export default RequireAuth;
