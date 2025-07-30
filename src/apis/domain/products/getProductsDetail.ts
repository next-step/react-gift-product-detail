import type { AxiosResponse } from 'axios';
import { apiInstance } from '@/apis/instance';
import type { ApiErrorResponse } from '@/apis/types';
import { API_PRODUCTS_PATH } from './path';
import type { ProductDetail } from './type';

export type GetProductsDetailParams = {
  productId: string;
};

export const getProductsDetail = async (
  params: GetProductsDetailParams,
): Promise<AxiosResponse<{ data: ProductDetail }, ApiErrorResponse>> => {
  return await apiInstance.get<{ data: ProductDetail }>(API_PRODUCTS_PATH.detail(params.productId));
};
