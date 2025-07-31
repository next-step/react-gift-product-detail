export type Product = {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export interface ProductList {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
}

export interface ProductDetail {
  description: string;
  announcements: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
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

export interface ProductReviewResponse {
  totalCount: number;
  reviews: ProductReview[];
}
