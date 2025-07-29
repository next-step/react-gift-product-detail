export type ThemeProductData = {
  brandInfo: {
    id: number;
    imageURL: string;
    name: string;
  };
  id: number;
  imageURL: string;
  name: string;
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
};

export type ThemeInfo = {
  backgroundColor: string;
  description: number;
  name: string;
  themeId: string;
  title: number;
};
