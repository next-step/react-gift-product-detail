export type ProductRankingFilterOption = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

export type ProductData = {
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

export type ProductSummary = {
  id: number;
  name: string;
  imageURL: string;
  brandName: string;
  price: number;
};

export type ProductDetail = {
  description: string;
  announcements: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
};

export type ProductHighlightReview = {
  totalCount: number;
  reviews: {
    id: string;
    authorName: string;
    content: string;
  }[];
};

export type ProductWish = {
  wishCount: number;
  isWished: boolean;
};
