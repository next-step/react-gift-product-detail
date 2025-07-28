export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageURL?: string;
};

export type ProductInfo = {
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

export type ProductDetail = {
  description: string;
  announcements: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
};

export type ProductPage = {
  list: ProductInfo[];
  cursor: number;
  hasMoreList: boolean;
};
