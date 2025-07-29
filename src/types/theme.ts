interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

export interface ThemeInfo {
  themeId: number;
  name: string;
  image: string;
}

interface Price {
  basicPrice: number;
  sellingPrice: number;
  discountRate: number;
}

export interface ItemData {
  id: number;
  name: string;
  price: Price;
  imageURL: string;
  brandInfo: BrandInfo;
}

export interface ThemeIdItemsData {
  list: ItemData[];
  cursor: number;
  hasMoreList: boolean;
}

export interface ThemeIdInfoData {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}
