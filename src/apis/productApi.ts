import type {
  ProductBasicInfo,
  ProductDetailInfo,
  ProductHighlightReview,
  ProductId,
  ProductWishInfo,
} from 'src/types/product';
import axiosInstance from './axiosInstance';

// 상품 기본정보 API
export const fetchProduct = async (
  id: ProductId
): Promise<ProductBasicInfo> => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data.data;
};

// 하이라이트 리뷰 API
export const fetchProductReviews = async (
  id: ProductId
): Promise<ProductHighlightReview> => {
  const res = await axiosInstance.get(`products/${id}/highlight-review`);
  return res.data.data;
};

// 상품 wish 정보 요청 API
export const fetchProductWishInfo = async (
  id: ProductId
): Promise<ProductWishInfo> => {
  const res = await axiosInstance.get(`/products/${id}/wish`);
  return res.data.data;
};

export const fetchProductDetailInfo = async (
  id: ProductId
): Promise<ProductDetailInfo> => {
  const res = await axiosInstance.get(`/products/${id}/detail`);
  return res.data.data;
};
