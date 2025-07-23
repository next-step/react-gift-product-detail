import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getUserInfo, setUserInfo, clearUserInfo, type UserInfo } from '@/utils/storage';

interface UserContextType {
  user: UserInfo | null;
  login: (user: UserInfo) => void;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getUserInfo();
    if (storedUser?.email && storedUser?.authToken) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (user: UserInfo) => {
    setUserInfo(user);
    setUser(user);
  };

  const logout = () => {
    clearUserInfo();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {!isLoading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('UserProvider로 감싼 컴포넌트 안에서 사용해야 합니다~');
  return context;
};
