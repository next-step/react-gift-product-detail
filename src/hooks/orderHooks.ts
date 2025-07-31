// src/hooks/orderHooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import type { ProductData } from '@/types/products';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

// 1) 상품 요약 정보 fetch 함수
export const fetchProductSummary = async (productId: number): Promise<ProductData> => {
  const { data } = await axios.get<{ data: ProductData }>(`/api/products/${productId}/summary`);
  return data.data;
};

// 2) 상품 조회 훅 (useQuery) - 단일 객체 API
export function useProduct(productId: number) {
  return useQuery<ProductData, AxiosError>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductSummary(productId),
    enabled: productId > 0,
  });
}

// 3) 주문 페이로드 타입 정의
export type OrderPayload = {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: {
    name: string;
    phoneNumber: string;
    quantity: number;
  }[];
};

// 4) 주문 생성 훅 (useMutation) - 단일 객체 API 사용
export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext)!; // 로그인 시 저장된 토큰

  return useMutation<
    AxiosResponse<{ data: { success: boolean } }>, // 성공 응답 타입
    AxiosError<{ data: { status: string; statusCode: number; message: string } }>, // 에러 응답 타입
    OrderPayload // mutation에 넘길 페이로드 타입
  >({
    mutationFn: (payload) =>
      axios.post<{ data: { success: boolean } }>('/api/order', payload, {
        headers: { Authorization: token! },
      }),
    onSuccess: () => {
      // 주문 후 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error('주문 실패:', error.response?.data.data.message);
    },
  });
}
