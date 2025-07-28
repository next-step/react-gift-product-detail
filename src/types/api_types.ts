export type Theme = {
  themeId: number;
  name: string;
  image: string;
};

export type ThemeInfo = {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

export type Product = {
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
};
export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export type ThemeProductResponse = {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
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
