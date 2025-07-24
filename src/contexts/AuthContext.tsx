import { getUserNameFromEmail } from "@/utils/getUserNameFromEmail";
import React, { createContext, useContext } from "react";
import { useStorageState } from "./hooks/useStorageState";

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  const { userInfo, setUserInfo } = context;
  const userName = getUserNameFromEmail(userInfo?.email ?? null);
  const loggedIn = !!userInfo?.isLoggedIn;
  return { userInfo, userName, loggedIn, setUserInfo };
};
