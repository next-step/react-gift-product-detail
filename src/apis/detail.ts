import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// 1. 상품 기본 정보
export interface ProductInfo {
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

export const fetchProductInfo = async (
  productId: string
): Promise<ProductInfo> => {
  const res = await axios.get<{ data: ProductInfo }>(
    `/api/products/${productId}`
  );
  return res.data.data;
};

export const useProductInfo = (productId: string) =>
  useQuery({
    queryKey: ['productInfo', productId],
    queryFn: () => fetchProductInfo(productId),
  });

// 2. 상품 상세 정보
export interface Announcement {
  name: string;
  value: string;
  displayOrder: number;
}

export interface ProductDetail {
  description: string;
  announcements: Announcement[];
}

export const fetchProductDetail = async (
  productId: string
): Promise<ProductDetail> => {
  const res = await axios.get<{ data: ProductDetail }>(
    `/api/products/${productId}/detail`
  );
  return res.data.data;
};

export const useProductDetail = (productId: string) =>
  useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
  });

// 3. 찜 정보 (mock API로 교체)
export interface WishInfo {
  wishCount: number;
  isWished: boolean;
}
const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const fetchWishInfo = async (_productId: string) => {
  await sleep(300);

  return {
    wishCount: 1234,
    isWished: false,
  };
};

export const fetchAddWishSuccess = async (
  newWish: boolean
): Promise<boolean> => {
  await sleep(300);
  return newWish;
};

export const fetchAddWishError = async (_newWish: boolean) => {
  await sleep(300);
  throw new axios.AxiosError('mock error', 'mock_code');
};

export const useWishInfo = (productId: string) =>
  useQuery({
    queryKey: ['wishInfo', productId],
    queryFn: () => fetchWishInfo(productId),
  });

// 4. 하이라이트 리뷰
export interface Review {
  id: string;
  authorName: string;
  content: string;
}

export interface HighlightReview {
  totalCount: number;
  reviews: Review[];
}

export const fetchHighlightReview = async (
  productId: string
): Promise<HighlightReview> => {
  const res = await axios.get<{ data: HighlightReview }>(
    `/api/products/${productId}/highlight-review`
  );
  return res.data.data;
};

export const useHighlightReview = (productId: string) =>
  useQuery({
    queryKey: ['highlightReview', productId],
    queryFn: () => fetchHighlightReview(productId),
  });
