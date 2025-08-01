export interface Product {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandName: string;
}

export interface ProductDetail {
  description: string;
  announcements: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
}

export interface ProductReview {
  totalCount: number;
  reviews: {
    id: string;
    authorName: string;
    content: string;
  }[];
}

export interface ProductWish {
  wishCount: number;
  isWished: boolean;
}

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export type GetRankingProductsResponse = {
  data: Product[];
};
