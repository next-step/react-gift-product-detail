import type { ProductSummaryInfo } from '@features/GiftOrderPage/OrderTypes';
import axiosInstance from './axiosInstance';

//선물 주문 페이지(GiftOrderPage) 상품 요약 정보 요청 API
export const fetchProductSummury = async (
  id: string | undefined
): Promise<ProductSummaryInfo> => {
  const res = await axiosInstance.get(`/products/${id}/summary`);
  return res.data.data;
};

// 선물 주문 페이지 주문 요청 API
interface OrderType {
  body: Record<string, unknown>;
  options: { headers: Record<string, string> };
}

export const postOrder = async ({ body, options }: OrderType) => {
  const res = await axiosInstance.post('/order', body, options);
  return res.data.data;
};
