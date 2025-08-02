import apiClient from '@/api/apiClient';
import type {
  Product,
  ProductDescription,
  ProductHighlightReview,
  ProductWish,
} from '@/types/product';

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export const getProductSummary = async (
  productId: number
): Promise<ProductSummary> => {
  const response = await apiClient.get(`/api/products/${productId}/summary`);
  return response.data.data;
};

export const getProductDetail = async (
  productId: number
): Promise<{ data: Product }> => {
  const response = await apiClient.get(`/api/products/${productId}`);
  return response.data;
};

export const getProductDescription = async (
  productId: number
): Promise<{ data: ProductDescription }> => {
  const response = await apiClient.get(`/api/products/${productId}/detail`);
  return response.data;
};

export const getProductHighlightReview = async (
  productId: number
): Promise<{ data: ProductHighlightReview }> => {
  const response = await apiClient.get(
    `/api/products/${productId}/highlight-review`
  );
  return response.data;
};

export const getProductWish = async (
  productId: number
): Promise<{ data: ProductWish }> => {
  const response = await apiClient.get(`/api/products/${productId}/wish`);
  return response.data;
};
