export interface ProductPrice {
  basicPrice: number;
  sellingPrice: number;
  discountRate: number;
}

export interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

export interface Product {
  id: number;
  name: string;
  price: ProductPrice;
  imageURL: string;
  brandInfo: BrandInfo;
  themeIds: number[]; // 상품이 속하는 테마 ID 목록
}

// 상품 기본 정보 (API 명세 4.1)
export interface ProductBasic {
  id: number;
  name: string;
  price: ProductPrice;
  imageURL: string;
  brandInfo: BrandInfo;
}

// 상품 상세 정보 (API 명세 4.2)
export interface ProductDetail {
  description: string;
  announcements: AnnouncementItem[];
}

export interface AnnouncementItem {
  name: string;
  value: string;
  displayOrder: number;
}

// 상품 찜 정보 (API 명세 4.3)
export interface ProductWish {
  wishCount: number;
  isWished: boolean;
}

// 상품 하이라이트 리뷰 (API 명세 4.4)
export interface ProductReview {
  totalCount: number;
  reviews: ReviewItem[];
}

export interface ReviewItem {
  id: string;
  authorName: string;
  content: string;
}
