import { useMutation } from '@tanstack/react-query';
import { logIn } from '@/services/login';
import useAuthStore from '@/stores/authStore';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: logIn,
    onSuccess: (data) => {
      useAuthStore.getState().login(data.authToken, { email: data.email, name: data.name });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            toast.error('잘못된 요청입니다. 입력한 정보를 확인해주세요.');
            break;
          default:
            toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
            break;
        }
      } else {
        toast.error('예상치 못한 오류가 발생했습니다.');
      }
    },
    meta: { showToast: false }, // 전역 토스트 비활성화
  });
};
