export interface Product {
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

export interface ProductDescription {
  description: string;
  announcements: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
}

export interface ProductHighlightReview {
  totalCount: number;
  reviews: {
    id: number;
    authorName: string;
    content: number;
  }[];
}

export interface ProductWish {
  wishCount: number;
  isWished: false;
}
