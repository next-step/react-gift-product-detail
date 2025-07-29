//상품 요약 정보
export interface ProductSummary {
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
}

// 상품 정보
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

// 상세 정보
export interface ProductDetail {
  description: string;
  announcements: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
}

// 찜 정보
export interface WishResponse {
  wishCount: number;
  isWished: boolean;
}

// 하이라이트 리뷰
export interface HighlightReviewResponse {
  totalCount: number;
  reviews: {
    id: string;
    authorName: string;
    content: string;
  }[];
}