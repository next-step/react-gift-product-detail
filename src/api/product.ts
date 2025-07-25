import apiClient from "@/api/apiClient";
import type {
  Product,
  ProductDetail,
  ProductWish,
  ProductReviewResponse,
} from "@/types/product";

export type ProductSummary = {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
};

export type TargetType = "ALL" | "FEMALE" | "MALE" | "TEEN";
export type RankType = "MANY_WISH" | "MANY_RECEIVE" | "MANY_WISH_RECEIVE";

export const fetchProductRanking = (
  targetType: TargetType = "ALL",
  rankType: RankType = "MANY_WISH",
): Promise<Product[]> => {
  return apiClient.get(`/products/ranking`, {
    params: {
      targetType,
      rankType,
    },
  });
};

export const fetchProductById = (productId: number): Promise<Product> => {
  return apiClient.get(`/products/${productId}`);
};

export const fetchProductSummary = (
  productId: number,
): Promise<ProductSummary> => {
  return apiClient.get(`/products/${productId}/summary`);
};

export const fetchProductInfo = async (productId: number): Promise<Product> => {
  return await apiClient.get(`/products/${productId}`);
};

export const fetchProductDetail = async (
  productId: number,
): Promise<ProductDetail> => {
  const response = await apiClient.get(`/products/${productId}/detail`);
  return response.data.data;
};

export const fetchProductWish = async (
  productId: number,
): Promise<ProductWish> => {
  const response = await apiClient.get(`/products/${productId}/wish`);
  return response.data.data;
};

export const fetchHighlightReview = async (
  productId: number,
): Promise<ProductReviewResponse> => {
  const response = await apiClient.get(
    `/products/${productId}/highlight-review`,
  );
  return response.data.data;
};
