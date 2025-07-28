export interface Product {
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

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export interface ProductDetail {
  description: string;
  announcements?: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
}

export interface ProductWish {
  wishCount: number;
  isWished: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  content: string;
}

export interface HighlightReview {
  totalCount: number;
  reviews: Review[];
}
