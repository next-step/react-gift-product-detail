export interface Product extends GiftItem {}

export interface Category {
  themeId: number;
  name: string;
  image: string;
}

export interface Price {
  basicPrice: number;
  discountRate: number;
  sellingPrice: number;
}

export interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

export interface GiftItem {
  id: number;
  name: string;
  imageURL: string;
  price: Price;
  brandInfo: BrandInfo;
}

export interface RankingItem extends GiftItem {
  give: number;
  want: number;
  receive: number;
}

export type RankField = 'give' | 'want' | 'receive';

export interface MessageCard {
  id: number;
  thumbUrl: string;
  imageUrl: string;
  defaultTextMessage: string;
}

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface OrderPayload {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: {
    name: string;
    phoneNumber: string;
    quantity: number;
  }[];
}

export interface ProductDetail {
  description: string;
  announcement: {
    name: string;
    value: string;
  }[];
}

export interface ProductReview {
  id: string;
  authorName: string;
  content: string;
}

export interface ProductWish {
  wishCount: number;
  isWished: boolean;
}
