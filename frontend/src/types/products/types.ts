export interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export interface Product {
  id: string | number;
  name: string;
  price: {
    basicPrice: string | number;
    sellingPrice: string;
    discountRate: string | number;
  };
  imageURL: string;
  brandInfo: {
    id: string | number;
    name: string;
    imageURL: string;
  };
}
