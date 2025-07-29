// hooks/useLoginMutation.ts
import { useMutation } from '@tanstack/react-query';
import { loginApi } from './loginApi';
import type { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SESSION_KEY_NAME } from '@src/assets/sessionKeyName';
import { URLS } from '@src/assets/urls';
import type { HttpsFailedResponseTypes } from '@src/types/LoginFetchDataType';

export const useLoginMutation = (navigate: NavigateFunction) => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if ((data as HttpsFailedResponseTypes)?.statusCode < 500) {
        toast((data as HttpsFailedResponseTypes).message);
        return;
      }
      sessionStorage.setItem(SESSION_KEY_NAME.email, data.email);
      sessionStorage.setItem(SESSION_KEY_NAME.username, data.name);
      sessionStorage.setItem(SESSION_KEY_NAME.token, data.authToken);

      const redirectProductId = sessionStorage.getItem('redirectProductId');
      if (redirectProductId) {
        sessionStorage.removeItem('redirectProductId');
        navigate(`${URLS.order}?productId=${redirectProductId}`);
      } else {
        navigate(URLS.home);
      }
    },
    onError: (error: Error) => {
      toast('로그인 중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};
