import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SESSION_KEY_NAME } from '@src/assets/sessionKeyName';
import { URLS } from '@src/assets/urls';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type {
  HttpsFailedResponseTypes,
  HttpsSuccessResponseType,
} from '@src/types/LoginFetchDataType';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type LoginBody = {
  email: string;
  password: string;
};

const loginApi = async (body: LoginBody) => {
  const response = await axios.post(BASE_URL + BASIC_ENDPOINT.login, body);
  return response.data;
};
export const useLoginQuery = () => {
  const navigate = useNavigate();
  return useMutation<HttpsSuccessResponseType, AxiosError<HttpsFailedResponseTypes>, LoginBody>({
    mutationFn: loginApi,
    onSuccess: (data: HttpsSuccessResponseType) => {
      sessionStorage.setItem(SESSION_KEY_NAME.email, data.data.email);
      sessionStorage.setItem(SESSION_KEY_NAME.username, data.data.name);
      sessionStorage.setItem(SESSION_KEY_NAME.token, data.data.authToken);
      const redirectProductId = sessionStorage.getItem('redirectProductId');
      if (redirectProductId) {
        sessionStorage.removeItem('redirectProductId');
        navigate(`${URLS.order}?productId=${redirectProductId}`);
      } else {
        navigate(URLS.home);
      }
    },
    onError: (error: AxiosError<HttpsFailedResponseTypes>) => {
      if (error.response?.data?.data.message) {
        toast(error.response.data.data.message);
      } else {
        toast('로그인 중 알 수 없는 오류가 발생했습니다.');
      }
      console.error('로그인 에러:', error);
    },
  });
};
