import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { API_QUERY_KEY } from '../query';
import {
  getProductsHighlightReview,
  type GetProductsHighlightReviewParams,
} from '../domain/products/getProductsHighlightReview';

export const useQueryProductsHighlightReview = (params: GetProductsHighlightReviewParams) => {
  return queryOptions({
    queryKey: API_QUERY_KEY.products.highlightReview(params.productId),
    queryFn: () => getProductsHighlightReview(params),
  });
};

export const useReadProductsHighlightReview = (params: GetProductsHighlightReviewParams) => {
  return useSuspenseQuery({
    ...useQueryProductsHighlightReview(params),
    select: (data) => data.data.data,
  });
};
