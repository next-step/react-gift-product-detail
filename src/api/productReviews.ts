import apiClient from '@/api/apiClient';

export interface Review {
  id: string;
  authorName: string;
  content: string;
}

export interface ProductReviewsResponse {
  totalCount: number;
  reviews: Review[];
}
export const getProductReviews = async (
  productId: number
): Promise<ProductReviewsResponse> => {
  const response = await apiClient.get(
    `/api/products/${productId}/highlight-review`
  );
  return response.data.data;
};
