import { api } from './api';

interface LoginResponse {
  data: {
    email: string;
    name: string;
    authToken: string;
  };
}

export const postLogin = (email: string, password: string): Promise<LoginResponse> => {
  return api.post('/api/login', { email, password }).then((res) => res.data);
};
