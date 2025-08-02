import type {
  ProductBasicInfoRes,
  ProductDetailInfoRes,
  ProductHighlightReviewRes,
  ProductId,
  ProductWishInfoRes,
} from 'src/types/product';
import axiosInstance from './axiosInstance';

// 상품 기본정보 API
export const fetchProduct = async (id: ProductId) => {
  const res = await axiosInstance.get<ProductBasicInfoRes>(`/products/${id}`);
  return res.data.data;
};

// 하이라이트 리뷰 API
export const fetchProductReviews = async (id: ProductId) => {
  const res = await axiosInstance.get<ProductHighlightReviewRes>(
    `products/${id}/highlight-review`
  );
  return res.data.data;
};

// 상품 wish 정보 요청 API
export const fetchProductWishInfo = async (id: ProductId) => {
  const res = await axiosInstance.get<ProductWishInfoRes>(
    `/products/${id}/wish`
  );
  return res.data.data;
};

export const fetchProductDetailInfo = async (id: ProductId) => {
  const res = await axiosInstance.get<ProductDetailInfoRes>(
    `/products/${id}/detail`
  );
  return res.data.data;
};
