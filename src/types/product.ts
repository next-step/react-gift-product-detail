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

export type ProductAnnouncement = {
  name: string;
  value: string;
  displayOrder: number;
};

export type ProductDetail = {
  description: string;
  announcement: ProductAnnouncement[];
};

export type ProductWish = {
  wishCount: number;
  isWished: boolean;
};
