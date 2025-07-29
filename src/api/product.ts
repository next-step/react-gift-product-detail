import axiosInstance from './axiosInstance';
import type {
  Product,
  ProductSummary,
  ProductList,
  ProductDetail,
  ProductWish,
  ProductReviewResponse,
} from '@/types/product';

export const fetchProductRanking = async (
  targetType: string,
  rankType: string
): Promise<Product[]> => {
  const res = await axiosInstance.get('/products/ranking', {
    params: {
      targetType,
      rankType,
    },
  });
  return res.data.data;
};

export const fetchProductSummary = async (productId: number): Promise<ProductSummary> => {
  const res = await axiosInstance.get(`/products/${productId}/summary`);
  return res.data.data;
};

export const fetchThemeProducts = async ({
  themeId,
  cursor = 0,
  limit = 10,
}: {
  themeId: number;
  cursor?: number;
  limit?: number;
}): Promise<ProductList> => {
  const res = await axiosInstance.get(`/themes/${themeId}/products`, {
    params: { cursor, limit },
  });
  return res.data.data;
};

export const fetchProduct = async (productId: number): Promise<Product> => {
  const res = await axiosInstance.get(`/products/${productId}`);
  return res.data.data;
};

export const fetchProductDetail = async (productId: number): Promise<ProductDetail> => {
  const res = await axiosInstance.get(`/products/${productId}/detail`);
  return res.data.data;
};

export const fetchProductWish = async (productId: number): Promise<ProductWish> => {
  const res = await axiosInstance.get(`/products/${productId}/wish`);
  return res.data.data;
};

export const fetchProductReviews = async (productId: number): Promise<ProductReviewResponse> => {
  const res = await axiosInstance.get(`/products/${productId}/highlight-review`);
  return res.data.data;
};
