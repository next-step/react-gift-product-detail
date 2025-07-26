import { postLogin } from '@apis/loginApi';
import { useMutation } from '@tanstack/react-query';
import handleAxiosError from '@utils/handleAxiosError';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  email: string;
  name: string;
  authToken: string;
}

interface AuthContextType {
  user: User | null;
  login: (loginInfo: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('userInfo');
    if (savedUser) setUser(JSON.parse(savedUser));
    setIsInitialized(true);
  }, []);

  const { mutateAsync: loginMutate } = useMutation({
    mutationFn: postLogin,
  });

  const login = async ({
    email,
    password,
  }: LoginCredentials): Promise<boolean> => {
    //임시 검증 로직

    try {
      const data = await loginMutate({ email, password });
      setUser(data);
      sessionStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('로그인 성공');
      return true;
    } catch (error) {
      handleAxiosError(error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
