export interface ProductInfo {
  themeId: number;
  name: string;
  image: string;
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
  };
}

export interface ProductWish {
  wishCount: number;
  isWished: boolean;
}
