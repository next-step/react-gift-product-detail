import { createContext, useContext, useMemo, useCallback, type ReactNode } from 'react';
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
  const { mutateAsync, isPending, error: mutationError, data } = useLoginMutation();

  // 로그인 성공 시 user 정보 추출 또는 localStorage에서 복원
  let user: User | null = null;
  if (data) {
    user = {
      email: data.data.email,
      name: data.data.name,
      authToken: data.data.authToken,
    };
  } else {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEYS.USER_INFO);
      }
    }
  }
  const isAuthenticated = !!user;

  // 로그인 처리
  const login = useCallback(async (email: string, password: string) => {
    await mutateAsync({ email, password }, {
      onSuccess: (response: any) => {
        // localStorage에 로그인 정보 저장
        const newUser: User = {
          email: response.data.email,
          name: response.data.name,
          authToken: response.data.authToken,
        };
        localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(newUser));
        toast.success('로그인이 완료되었습니다!');
      },
      onError: (err: any) => {
        const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다.';
        toast.error(errorMessage);
      }
    });
  }, [mutateAsync]);

  // 로그아웃 처리
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    window.location.reload(); // 상태 초기화 목적(필요시)
  }, []);

  // 컨텍스트 값 정의
  const value = useMemo(() => {
    let mergedError: string | null = null;
    if (mutationError) {
      mergedError = typeof mutationError === 'string' ? mutationError : mutationError.message ?? '알 수 없는 에러';
    }
    return {
      user,
      isAuthenticated,
      login,
      logout,
      loading: isPending,
      error: mergedError,
    };
  }, [user, isAuthenticated, login, logout, isPending, mutationError]);

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
