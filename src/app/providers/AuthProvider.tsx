import React, { useState, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '@/entities/user/model/context';
import type { UserInfo } from '@/entities/user/model/types';
import { login as loginApi } from '@/entities/user/api/authApi';
import { STORAGE_KEYS } from '@/shared/config/storageKeys';
import { useMutation } from '@tanstack/react-query';
import { mutationErrorHandler } from '@/shared/lib/utils/errorHandler';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const savedUserInfo = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);
    if (savedUserInfo) {
      try {
        return JSON.parse(savedUserInfo);
      } catch {
        sessionStorage.removeItem(STORAGE_KEYS.USER_INFO);
        return null;
      }
    }
    return null;
  });

  const { mutate: loginMutation } = useMutation({
    mutationFn: loginApi,
    onSuccess: (response: UserInfo) => {
      setUserInfo(response);
      sessionStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(response));
      toast.success('로그인에 성공했습니다.');
    },
    onError: mutationErrorHandler('로그인에 실패했습니다.'),
  });

  const login = useCallback(async (email: string, password: string, onSuccess?: () => void) => {
    return new Promise<void>((resolve, reject) => {
      loginMutation({ email, password }, {
        onSuccess: () => {
          onSuccess?.();
          resolve();
        },
        onError: (error) => {
          reject(error);
        },
      });
    });
  }, [loginMutation]);

  const logout = useCallback(() => {
    setUserInfo(null);
    sessionStorage.removeItem(STORAGE_KEYS.USER_INFO);
  }, []);

  const isLoggedIn = !!userInfo;

  //리뷰 반영 : 의존성배열에 모두 추가
  const value = useMemo(() => ({ isLoggedIn, userInfo, login, logout }), [userInfo, isLoggedIn, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};