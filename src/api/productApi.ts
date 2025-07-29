import API from './axiosInstance';
import type { ProductSummary, ProductInfo, ProductDetail, WishResponse, HighlightReviewResponse } from '@/types/product';

//상품 요약 정보
export const fetchProductSummary = async (id: number): Promise<ProductSummary> => {
  const res = await API.get(`/api/products/${id}/summary`);
  return res.data.data;
};

//상품 기본 정보 조회
export const fetchProductInfo = async (productId: number): Promise<ProductInfo> => {
  const res = await API.get(`/api/products/${productId}`);
  return res.data.data;
};

//상품 상세 정보 조회
export const fetchProductDetail = async (id: number): Promise<ProductDetail> => {
  const res = await API.get(`/api/products/${id}/detail`);
  return res.data.data;
};

//상품 찜 정보 조회
export const fetchWishCount = async (id: number): Promise<WishResponse> => {
  const res = await API.get(`/api/products/${id}/wish`);
  return res.data.data;
};

//상품 하이라이트 리뷰 조회
export const fetchHighlightReview = async (id: number): Promise<HighlightReviewResponse> => {
  const res = await API.get(`/api/products/${id}/highlight-review`);
  return res.data.data;
};