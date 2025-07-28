import apiClient from '@/api/apiClient';

export interface ProductNotice {
  name: string;
  value: string;
  displayOrder: number;
}

export interface ProductDetail {
  description: string;
  notices: ProductNotice[];
}

export const getProductDetail = async (
  productId: number
): Promise<ProductDetail> => {
  const response = await apiClient.get(`/api/products/${productId}/detail`);
  return response.data.data;
};
