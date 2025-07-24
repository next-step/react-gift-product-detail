// Context types
export interface UserInfo {
    email: string;
    name: string;
    authToken: string;
  }
  
export interface AuthContextType {
    isLoggedIn: boolean;
    userInfo: UserInfo | null;
    login: (email: string, password: string, onSuccess?: () => void) => Promise<void>;
    logout: () => void;
  }

// API types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    email: string;
    name: string;
    authToken: string;
}