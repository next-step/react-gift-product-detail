import axiosInstance from './axiosInstance';

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export async function getProductSummary(productId: number): Promise<ProductSummary> {
  const res = await axiosInstance.get<{ data: ProductSummary }>(
    `/api/products/${productId}/summary`,
  );
  return res.data.data;
}

export interface Product {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

export async function getProduct(productId: number): Promise<Product> {
  const res = await axiosInstance.get<{ data: Product }>(`/api/products/${productId}`);
  return res.data.data;
}

export interface ProductDetail {
  description: string;
  announcements: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
}

export async function getProductDetail(productId: number): Promise<ProductDetail> {
  const res = await axiosInstance.get<{ data: ProductDetail }>(`/api/products/${productId}/detail`);
  return res.data.data;
}

export interface ProductReview {
  id: string;
  authorName: string;
  content: string;
}

export interface ProductReviewResponse {
  totalCount: number;
  reviews: ProductReview[];
}

export async function getProductHighlightReview(productId: number): Promise<ProductReviewResponse> {
  const res = await axiosInstance.get<{ data: ProductReviewResponse }>(
    `/api/products/${productId}/highlight-review`,
  );
  return res.data.data;
}

export interface WishInfo {
  wishCount: number;
  isWished: boolean;
}

export async function getWishInfo(productId: number): Promise<WishInfo> {
  const res = await axiosInstance.get<{ data: WishInfo }>(`/api/products/${productId}/wish`);
  return res.data.data;
}
