import { createContext, useContext } from 'react';
import type { AuthContextType } from '../model/types';

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider 내부사용 필요');
  }
  return context;
};
