// 테마 관련 타입
export interface Theme {
  themeId: number;
  name: string;
  image: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export interface ThemeResponse {
  data: Theme[];
}

// 상품 관련 타입
export interface ProductPrice {
  basicPrice: number;
  sellingPrice: number;
  discountRate: number;
}

export interface ProductBrand {
  id: number;
  name: string;
  imageURL: string;
}

export interface Product {
  id: number;
  name: string;
  price: ProductPrice;
  imageURL: string;
  brandInfo: ProductBrand;
}

// 상품 요약 정보 타입
export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export interface RankingResponse {
  data: Product[];
}

export interface ProductResponse {
  data: Product;
}

// 랭킹 필터 타입 (API 명세에 맞게 수정)
export type TargetType = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
export type RankType = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';

// API 에러 타입
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// 상품 상세 관련 타입들
export interface ProductDetail {
  description: string;
  announcements: ProductAnnouncement[];
}

export interface ProductAnnouncement {
  name: string;
  value: string;
  displayOrder: number;
}

export interface ProductWish {
  wishCount: number;
  isWished: boolean;
}

export interface ProductReview {
  id: string;
  authorName: string;
  content: string;
}

export interface ProductHighlightReview {
  totalCount: number;
  reviews: ProductReview[];
}

// API 응답 타입들
export interface ProductDetailResponse {
  data: ProductDetail;
}

export interface ProductWishResponse {
  data: ProductWish;
}

export interface ProductHighlightReviewResponse {
  data: ProductHighlightReview;
}
