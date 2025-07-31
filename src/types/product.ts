interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

interface PriceInfo {
  basicPrice: number;
  sellingPrice: number;
  discountRate: number;
}

export interface ProductInfo {
  id: number;
  name: string;
  price: PriceInfo;
  imageURL: string;
  brandInfo: BrandInfo;
}

export interface RankingApiProps {
  activeGeneration: string;
  activeFilter: string;
}

export interface ProductSummaryData {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export interface Announcement {
  name: string;
  value: string;
  displayOrder: number;
}

export interface ProductDetailData {
  description: string;
  announcements: Announcement[];
}

export interface ProductWishData {
  wishCount: number;
  isWished: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  content: string;
}

export interface ProductReviewData {
  totalCount: number;
  reviews: Review[];
}
