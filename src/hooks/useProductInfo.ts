import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchProductGeneralInfo,
  fetchProductDetailInfo,
  fetchProductHighLightReview,
  fetchProductWish
} from "@src/apis/BackEnd/apiList";
import type { ProductInfoType } from "@src/types/ProductInfoType";

export function useProductInfo(productId: string): ProductInfoType {
  const productInfo = useSuspenseQuery({
    queryKey: ["productInfo", productId],
    queryFn: async () => {
      const [generalInfo, detailInfo, reviewInfo, wishInfo] = await Promise.all(
        [
          fetchProductGeneralInfo(productId),
          fetchProductDetailInfo(productId),
          fetchProductHighLightReview(productId),
          fetchProductWish(productId)
        ]
      );
      return {
        generalInfo,
        detailInfo,
        reviewInfo,
        wishInfo
      };
    }
  });

  return productInfo.data;
}
