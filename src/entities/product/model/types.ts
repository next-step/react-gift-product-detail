export interface RankingProduct {
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

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export interface ProductDetail {
  description: string;
  announcements: Array<{
    name: string;
    value: string;
    displayOrder: number;
  }>;
}

export interface ProductHighlightReview {
  totalCount: number;
  reviews: Array<{
    id: string;
    authorName: string;
    content: string;
  }>;
}

export interface ProductWish {
  wishCount: number;
  isWished: boolean;
}

export type TargetType = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
export type RankType = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
export type TabType = 'description' | 'review' | 'detail';

export interface MockRankingProduct {
  id: number;
  name: string;
  brandInfo: {
    name: string;
  };
  price: {
    sellingPrice: number;
  };
  imageURL: string;
  gender: TargetType;
  action: RankType;
}
