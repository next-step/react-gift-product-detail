//상품 요청 관련 API 응답 타입에서 데이터만 추출한 타입
// API 응답이 아닌 데이터 타입이기 때문에 type 대신 interace로 작성

// useParams에서 얻은 상품 Id 타입
export type ProductId = string | undefined;

// 상품 기본정보
export interface ProductBasicInfo {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

//상품 상세정보
export interface ProductAnnouncement {
  name: string;
  value: string;
  displayOrder: number;
}

export interface ProductDetailInfo {
  description: string;
  announcements: ProductAnnouncement[];
}

// 상품 찜 정보
export interface ProductWishInfo {
  wishCount: number;
  isWished: boolean;
}

//하이라이트 리뷰
export interface Review {
  id: string;
  authorName: string;
  content: string;
}

export interface ProductHighlightReview {
  totalCount: number;
  reviews: Review[];
}
