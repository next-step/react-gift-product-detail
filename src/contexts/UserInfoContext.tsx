import type { LoginPayload } from '@/api/types/auth.dto';
import { createContext } from 'react';

type UserInfoContext = {
  isValid: boolean;
  user: LoginPayload;
  setUser: React.Dispatch<React.SetStateAction<LoginPayload>>;
};

export const UserInfoContext = createContext<UserInfoContext | null>(null);
