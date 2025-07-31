import type { TAB_DATA, TAGS } from "@/constants";

export interface ProductDetailResponseBody {
  description: string;
  announcements: Array<{
    name: string;
    value: string;
    displayOrder: number;
  }>;
}

export interface ProductHighlightReviewResponseBody {
  totalCount: number;
  reviews: Array<{
    id: string;
    authorName: string;
    content: string;
  }>;
}

export interface ProductWishCountResponseBody {
  wishCount: number;
  isWished: boolean;
}

export interface ProductSummaryResponseBody {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export type RankingTargetType = (typeof TAGS)[number]["id"];
export type RankingRankType = (typeof TAB_DATA)[number]["id"];
export interface GetRankingProductParams {
  targetType: RankingTargetType;
  rankType: RankingRankType;
}
