import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchProductGeneralInfo,
  fetchProductDetailInfo,
  fetchProductHighLightReview,
  fetchProductWish
} from "@src/apis/BackEnd/apiList";

type GeneralInfoType = {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

type DetailInfoType = {
  description: number;
  announcement: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
};

type ReviewInfoType = {
  totalCount: number;
  reviews: {
    id: string;
    authorName: string;
    content: string;
  }[];
};
type WishInfoType = {
  wishCount: number;
  isWished: boolean;
};

export type ProductInfoType = {
  generalInfo: GeneralInfoType;
  detailInfo: DetailInfoType;
  reviewInfo: ReviewInfoType;
  wishInfo: WishInfoType;
};

export function useProductInfo(productId: string): ProductInfoType {
  const generalInfo = useSuspenseQuery({
    queryKey: ["generalInfo", productId],
    queryFn: () => fetchProductGeneralInfo(productId)
  });

  const detailInfo = useSuspenseQuery({
    queryKey: ["detailInfo", productId],
    queryFn: () => fetchProductDetailInfo(productId)
  });

  const reviewInfo = useSuspenseQuery({
    queryKey: ["reviewInfo", productId],
    queryFn: () => fetchProductHighLightReview(productId)
  });

  const wishInfo = useSuspenseQuery({
    queryKey: ["wishInfo", productId],
    queryFn: () => fetchProductWish(productId)
  });

  return {
    generalInfo: generalInfo.data,
    detailInfo: detailInfo.data,
    reviewInfo: reviewInfo.data,
    wishInfo: wishInfo.data
  };
}
