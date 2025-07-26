export interface Product {
  id: number;
  name: string;
  brandName: string;
  price: {
    originalPrice: number;
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
    id: number;
    authorName: string;
    content: string;
  }[];
}

export interface ProductHeart {
  wishCount: number;
  isWished: boolean;
}
