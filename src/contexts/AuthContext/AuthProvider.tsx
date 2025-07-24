import { useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';
import { SESSION_STORAGE_KEY, LOGIN_API_URL } from '@/hooks/constants/api';
import { AuthContext } from '@/contexts/AuthContext/AuthContext';
import type { User, LoginParams } from '@/types/auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  const login = async ({ email, password }: LoginParams) => {
    const res = await axios.post<{ data: User }>(LOGIN_API_URL, {
      email,
      password,
    });
    const userData = res.data.data;
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn: !!user,
        isLoading,
        authToken: user?.authToken ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
