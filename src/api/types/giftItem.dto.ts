export type CategoryCardData = {
  themeId: number;
  name: string;
  image: string;
};

export type GiftItemData = {
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
};

export type ThemeInfo = {
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

export type ThemedGiftItemsPage = {
  list: GiftItemData[];
  cursor: number;
  hasMoreList: boolean;
};

export type PageParam = number;

type Params = {
  id?: number;
  targetType?: string;
  rankType?: string;
};

export type QueryKey = [string, Params];
