import type { AxiosResponse } from 'axios';
import { apiInstance } from '@/apis/instance';
import type { ApiErrorResponse } from '@/apis/types';
import { API_PRODUCTS_PATH } from './path';
import type { ProductWish } from './type';

export type GetProductsWishParams = {
  productId: string;
};

export type GetProductsWishAxiosResponse = AxiosResponse<{ data: ProductWish }, ApiErrorResponse>;

export const getProductsWish = async (
  params: GetProductsWishParams,
): Promise<GetProductsWishAxiosResponse> => {
  return await apiInstance.get<{ data: ProductWish }>(API_PRODUCTS_PATH.wish(params.productId));
};
