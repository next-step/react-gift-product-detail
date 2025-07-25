import { useMutation } from '@tanstack/react-query';
import { login, type LoginResponse } from '@/apis/auth';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

interface LoginVariables {
  email: string;
  password: string;
}

export function useLoginMutation() {
  return useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: login,
  });
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
