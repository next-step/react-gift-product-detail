// 상품 정보 API 응답 타입
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

// 상품 세부 정보 API 응답 타입
export interface AnnouncementItem {
  name: string;
  value: string;
  displayOrder: number;
}

export interface ProductDetail {
  description?: string;
  announcements?: AnnouncementItem[];
  // 실제 API 응답에 따라 추가 필드들이 있을 수 있음
  [key: string]: unknown;
}

// 상품 주요 리뷰 API 응답 타입
export interface ProductReview {
  id: string;
  authorName: string;
  content: string;
}

export interface ProductHighlightReview {
  totalCount: number;
  reviews: ProductReview[];
}

// 상품 관심 등록 수 API 응답 타입
export interface ProductWish {
  wishCount: number;
  isWished: boolean;
}

// API 응답 래퍼 타입들
export interface ProductInfoResponse {
  data: ProductInfo;
}

export interface ProductDetailResponse {
  data: ProductDetail;
}

export interface ProductHighlightReviewResponse {
  data: ProductHighlightReview;
}

export interface ProductWishResponse {
  data: ProductWish;
} 