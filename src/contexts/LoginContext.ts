import { createContext } from "react";
import type { UserInfo } from "../types/auth";

export interface LoginContextType {
  user: UserInfo | null;
  isLoggedIn: boolean;
  isInitialized: boolean;
  login: (userInfo: UserInfo) => void;
  logout: () => void;
}

export const LoginContext = createContext<LoginContextType | undefined>(undefined); 