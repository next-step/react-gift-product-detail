import type { LoginPayload } from '@/types/loginPayload';
import { createContext } from 'react';

type UserInfoContext = {
  isValid: boolean;
  user: LoginPayload;
  setUser: React.Dispatch<React.SetStateAction<LoginPayload>>;
};

export const UserInfoContext = createContext<UserInfoContext | null>(null);
