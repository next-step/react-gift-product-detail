import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchProductGeneralInfo,
  fetchProductDetailInfo,
  fetchProductHighLightReview,
  fetchProductWish
} from "@src/apis/BackEnd/apiList";
import type { ProductInfoType } from "./ProductInfoType";

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
