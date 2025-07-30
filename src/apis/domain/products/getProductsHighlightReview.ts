import type { AxiosResponse } from 'axios';
import { apiInstance } from '@/apis/instance';
import type { ApiErrorResponse } from '@/apis/types';
import { API_PRODUCTS_PATH } from './path';
import type { ProductHighlightReview } from './type';

export type GetProductsHighlightReviewParams = {
  productId: string;
};

export const getProductsHighlightReview = async (
  params: GetProductsHighlightReviewParams,
): Promise<AxiosResponse<{ data: ProductHighlightReview }, ApiErrorResponse>> => {
  return await apiInstance.get<{ data: ProductHighlightReview }>(
    API_PRODUCTS_PATH.highlightReview(params.productId),
  );
};
