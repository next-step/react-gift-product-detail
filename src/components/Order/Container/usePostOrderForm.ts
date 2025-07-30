import { useMutation } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { toast } from 'react-toastify';
import type { NavigateFunction } from 'react-router-dom';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import { SESSION_KEY_NAME } from '@src/assets/sessionKeyName';
import { URLS } from '@src/assets/urls';
import { PostFetch } from '@src/api/postFetch';

export type OrderRequestData = {
  productId: number | undefined;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: {
    name: string;
    phoneNumber: string;
    quantity: number;
  }[];
};
export type OrderSuccessResponse = {
  data: {
    success: boolean;
  };
};
export type OrderFailedResponse = {
  success: boolean;
  message: string;
  statusCode: number;
};

export const usePostOrderForm = (navigate: NavigateFunction) => {
  return useMutation<OrderSuccessResponse, AxiosError<OrderFailedResponse>, OrderRequestData>({
    mutationFn: async (orderData: OrderRequestData) => {
      const authToken = sessionStorage.getItem(SESSION_KEY_NAME.token) as string;
      if (!authToken) {
        navigate(URLS.login);
        throw new Error('로그인이 필요합니다.');
      }
      return PostFetch<OrderSuccessResponse, OrderRequestData>(BASIC_ENDPOINT.order, orderData, {
        headers: {
          Authorization: authToken,
        },
      });
    },
    onSuccess: (data) => {
      if (!data.data.success) {
        toast('주문 처리에 실패했습니다.');
        return;
      }
      toast('주문이 성공적으로 완료되었습니다!');
      navigate(URLS.home);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast('인증이 만료되었습니다. 다시 로그인해주세요.');
          navigate(URLS.login);
        } else if (error.response?.data?.message) {
          toast(error.response.data.message);
        } else {
          toast('주문 처리 중 알 수 없는 오류가 발생했습니다.');
        }
      } else {
        toast('알 수 없는 오류가 발생했습니다.');
      }
      console.error('주문 에러:', error);
    },
  });
};
