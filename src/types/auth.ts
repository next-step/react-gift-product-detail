export type User = {
  email: string;
  name: string;
  authToken: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type AuthContextType = {
  user: User | null;
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  authToken: string | null;
};
