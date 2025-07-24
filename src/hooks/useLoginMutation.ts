import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LOGIN_API_URL, SESSION_STORAGE_KEY } from './constants/api';

export type User = {
  email: string;
  name: string;
  authToken: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export const useLoginMutation = (onSuccess?: (user: User) => void) => {
  return useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      const res = await axios.post<{ data: User }>(LOGIN_API_URL, {
        email,
        password,
      });
      return res.data.data;
    },
    onSuccess: user => {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      onSuccess?.(user);
    },
  });
};
