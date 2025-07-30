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
  imageURL: string;
  brandName: string;
  price: number;
}

export interface ProductAnnouncement {
  name: string;
  value: string;
  displayOrder: number;
}

export interface ProductDetail {
  description: string;
  announcements: ProductAnnouncement[];
}

export interface Review {
  id: string;
  authorName: string;
  content: string;
}

export interface ProductReview {
  totalCount: number;
  reviews: Review[];
}
