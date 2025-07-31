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

export type GiftItemDetailData = {
  description: string;
  announcements: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
};

export type GiftItemHighlightReviewData = {
  totalCount: number;
  reviews: {
    id: string;
    authorName: string;
    content: string;
  }[];
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

export type WishInfo = {
  wishCount: number;
  isWished: boolean;
};

type Params = {
  id?: number;
  targetType?: string;
  rankType?: string;
};

export type QueryKey = [string, Params];
