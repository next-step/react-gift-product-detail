import type { AxiosResponse } from 'axios';
import type { ProductData } from './type';
import { apiInstance } from '@/apis/instance';

import type { ApiErrorResponse } from '@/apis/types';
import { API_PRODUCTS_PATH } from './path';

export type GetProductsByIdParams = {
  productId: string;
};

export const getProductsById = async (
  params: GetProductsByIdParams,
): Promise<AxiosResponse<{ data: ProductData }, ApiErrorResponse>> => {
  return await apiInstance.get<{ data: ProductData }>(API_PRODUCTS_PATH.byId(params.productId));
};
