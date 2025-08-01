import { getUserNameFromEmail } from "@/utils/getUserNameFromEmail";
import React, { createContext, useContext, useCallback } from "react";
import { useStorageState } from "@/contexts/hooks/useStorageState";

type UserInfo = {
  email: string;
  name: string;
  authToken: string;
  isLoggedIn: boolean;
};

type AuthContextType = {
  userInfo: UserInfo | undefined;
  setUserInfo: (userInfo: UserInfo | undefined) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useStorageState<UserInfo>("userInfo");

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

type UseAuthOptions = {
  onLogout?: () => void;
};

export const useAuth = (options: UseAuthOptions = {}) => {
  const { onLogout } = options;
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  const { userInfo, setUserInfo } = context;
  const userName = getUserNameFromEmail(userInfo?.email ?? null);
  const loggedIn = !!userInfo?.isLoggedIn;

  const logout = useCallback(() => {
    setUserInfo(undefined);
    onLogout?.();
  }, [setUserInfo, onLogout]);

  return { userInfo, userName, loggedIn, setUserInfo, logout };
};
