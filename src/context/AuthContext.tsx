import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';
import { useAuthUser } from '@/hooks/useAuthUser';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  redirectAfterLogin: string | null;
  onChangeRedirectAfterLogin: (path: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoggedIn, token, setUser, setIsLoggedIn, setToken, storage } =
    useAuthUser();
  const [redirectAfterLogin, onChangeRedirectAfterLogin] = useState<
    string | null
  >(null);
  const { login: loginHandler, isLoading } = useLogin();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await loginHandler(email, password);
      if (loggedInUser) {
        const userData = {
          name: loggedInUser.name,
          email: loggedInUser.email,
          token: loggedInUser.authToken,
        };
        setUser(userData);
        setIsLoggedIn(true);
        setToken(loggedInUser.authToken);
        storage.set(userData);
        navigate(redirectAfterLogin || '/');
        onChangeRedirectAfterLogin(null);
      }
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
      setToken(null);
      storage.clear();
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setToken(null);
    storage.clear();
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      token,
      login,
      logout,
      isLoading,
      redirectAfterLogin,
      onChangeRedirectAfterLogin,
    }),
    [isLoggedIn, user, token, isLoading, redirectAfterLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다.');
  }
  return context;
};
