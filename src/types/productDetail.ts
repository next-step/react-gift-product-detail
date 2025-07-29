// 상품 정보 API 응답 타입
export interface ProductInfo {
  id: number;
  name: string;
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  description: string;
  category: string;
  tags: string[];
}

// 상품 세부 정보 API 응답 타입
export interface ProductDetail {
  id: number;
  specifications: {
    weight: string;
    size: string;
    material: string;
    origin: string;
  };
  delivery: {
    shippingFee: number;
    freeShippingThreshold: number;
    estimatedDays: string;
  };
  images: string[];
  description: string;
}

// 상품 주요 리뷰 API 응답 타입
export interface ProductReview {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  content: string;
  createdAt: string;
  images?: string[];
}

export interface ProductHighlightReview {
  averageRating: number;
  totalReviews: number;
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