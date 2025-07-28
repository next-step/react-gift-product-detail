import apiClient from '@/api/apiClient';

export interface ProductWishStatus {
  wishCount: number;
  isWished: boolean;
}

export const getProductWishStatus = async (
  productId: number
): Promise<ProductWishStatus> => {
  const response = await apiClient.get(`/api/products/${productId}/wish`);
  return response.data.data;
};
