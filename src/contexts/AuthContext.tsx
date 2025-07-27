import { createContext, useState, useContext, useEffect, useMemo, useCallback, type ReactNode } from 'react';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../hooks/useAuthQuery';
import { STORAGE_KEYS } from '../constants/storage';
import type { User } from '../types/auth';

// 인증 컨텍스트의 값 타입 정의
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

// 초기값으로 빈 객체 생성
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  loading: false,
  error: null,
});

// 컨텍스트 Provider 컴포넌트 타입 정의
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // 사용자 정보 상태
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  // 인증 상태 계산 (user가 존재하면 true)
  const isAuthenticated = !!user;

  // react-query mutation 사용
  const loginMutation = useLoginMutation();

  // 컴포넌트 마운트 시 localStorage에서 사용자 정보 불러오기
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // 잘못된 JSON 형식일 경우 localStorage 데이터 삭제
        localStorage.removeItem(STORAGE_KEYS.USER_INFO);
      }
    }
  }, []);
      
  // 로그인 처리 (react-query mutation 활용)
  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const response = await loginMutation.mutateAsync({ email, password });
      const newUser: User = {
        email: response.data.email,
        name: response.data.name,
        authToken: response.data.authToken,
      };
      setUser(newUser);
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(newUser));
      toast.success('로그인이 완료되었습니다!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  }, [loginMutation]);

  // 로그아웃 처리 (useCallback으로 메모이제이션)
  const logout = useCallback(() => {
    // 사용자 정보 초기화
    setUser(null);
    setError(null);
    
    // localStorage에서 사용자 정보 삭제
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  }, []);

  // 컨텍스트 값 정의
  const value = useMemo(() => ({
    user,
    isAuthenticated,
    login,
    logout,
    loading: loginMutation.isPending,
    error,
  }), [user, isAuthenticated, login, logout, loginMutation.isPending, error]);

  // Provider로 자식 컴포넌트 감싸기
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 커스텀 훅: useAuth
export const useAuth = () => {
  return useContext(AuthContext);
};
