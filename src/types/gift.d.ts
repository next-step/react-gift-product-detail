import { targetType, rankType } from "@/data/giftType";

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

export interface Gift {
  id: number;
  name: string;
  imageURL: string;
  price: Price;
  brandInfo: BrandInfo;
}

export type GiftSummary = {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
};

type GiftAnnouncement = {
  name: string;
  value: string;
  displayOrder: number;
};

export type GiftDetail = {
  description: string;
  announcements: GiftAnnouncement[];
};

export type GiftWish = {
  wishCount: number;
  isWished: boolean;
};

export type GiftReview = {
  id: number;
  authorName: string;
  content: string;
};

export type GiftReviews = {
  totalCount: number;
  reviews: GiftReview[];
};

export type TargetType = (typeof targetType)[number]["id"];

export type RankType = (typeof rankType)[number]["id"];
