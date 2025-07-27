import axios from 'axios';
import type {
  Product,
  ProductBasic,
  ProductDetail,
  ProductWish,
  ProductReview,
} from '@/types/product';
import type { BaseResponse } from '@/types/common';

export async function fetchProductRanking(): Promise<Product[]> {
  const res = await axios.get<BaseResponse<Product[]>>('/api/products/ranking');
  return res.data.data;
}

// 상품 기본 정보 조회
export async function fetchProductBasic(
  productId: number,
): Promise<ProductBasic> {
  const res = await axios.get<BaseResponse<ProductBasic>>(
    `/api/products/${productId}`,
  );
  return res.data.data;
}

// 상품 상세 정보 조회
export async function fetchProductDetail(
  productId: number,
): Promise<ProductDetail> {
  const res = await axios.get<BaseResponse<ProductDetail>>(
    `/api/products/${productId}/detail`,
  );
  return res.data.data;
}

// 상품 찜 정보 조회
export async function fetchProductWish(
  productId: number,
): Promise<ProductWish> {
  const res = await axios.get<BaseResponse<ProductWish>>(
    `/api/products/${productId}/wish`,
  );
  return res.data.data;
}

// 상품 하이라이트 리뷰 조회
export async function fetchProductHighlightReview(
  productId: number,
): Promise<ProductReview> {
  const res = await axios.get<BaseResponse<ProductReview>>(
    `/api/products/${productId}/highlight-review`,
  );
  return res.data.data;
}
