import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { SESSION_STORAGE_KEY } from '@/hooks/constants/api';
import {
  useLoginMutation,
  type LoginParams,
  type User,
} from '@/hooks/useLoginMutation';

type AuthContextType = {
  user: User | null;
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  authToken: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { mutateAsync: loginMutateAsync } = useLoginMutation(setUser);

  useEffect(() => {
    const storedUser = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (params: LoginParams) => {
    await loginMutateAsync(params);
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
        isLoggedIn: user !== null,
        isLoading,
        authToken: user?.authToken ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth는 AuthProvider 내부에서 사용해야 함');
  return context;
};
