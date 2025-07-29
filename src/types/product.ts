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

export interface GiftRankingItem {
  id: number;
  name: string;
  price: PriceInfo;
  imageURL: string;
  brandInfo: BrandInfo;
}

export interface RankingApiProps {
  activeGenerationButton: string;
  activeFilterButton: string;
}

export interface ProductSummaryData {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}
