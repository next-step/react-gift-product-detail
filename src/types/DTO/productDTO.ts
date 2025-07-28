export const TargetType = {
  ALL: 'ALL',
  FEMALE: 'FEMALE',
  MALE: 'MALE',
  TEEN: 'TEEN',
} as const;
export type TargetType = (typeof TargetType)[keyof typeof TargetType];

export const RankType = {
  MANY_WISH: 'MANY_WISH',
  MANY_RECEIVE: 'MANY_RECEIVE',
  MANY_WISH_RECEIVE: 'MANY_WISH_RECEIVE',
} as const;
export type RankType = (typeof RankType)[keyof typeof RankType];

export interface RankingQuery {
  targetType?: TargetType;
  rankType?: RankType;
}

export type ProductBasicInfo = {
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
};

export interface ProductDetailResponseDto {
  data: ProductBasicInfo[];
}
export interface ProductSummaryRequestDTO {
  productId: number;
}
export type ProductSummary = {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
};
export interface ProductSummaryResponseDTO {
  data: ProductSummary;
}

export interface ProductBasicInfoResponseDTO {
  data: ProductBasicInfo;
}

export interface ProductAnnouncement {
  name: string;
  value: string;
  displayOrder: number;
}

export interface ProductDetailInfo {
  description: string;
  announcements: ProductAnnouncement[];
}

export interface ProductDetailInfoResponseDTO {
  data: ProductDetailInfo;
}

export interface ProductWishInfo {
  wishCount: number;
  isWished: boolean;
}

export interface ProductWishInfoResponseDTO {
  data: ProductWishInfo;
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

export interface ProductHighlightReviewResponseDTO {
  data: ProductHighlightReview;
}
