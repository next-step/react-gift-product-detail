import { getProductDetail } from "@/api/product/get-product-detail";
import { getProductHighlightReview } from "@/api/product/get-product-highlight-review";
import { getProductInfo } from "@/api/product/get-product-info";
import { getProductWishCount } from "@/api/product/get-product-wish-count";
import { queryKeys } from "@/lib/query-keys";
import { useSuspenseQueries } from "@tanstack/react-query";

export const useProductDetail = (productId: number) => {
  const [productInfo, productDetail, highlightReview, wishCount] =
    useSuspenseQueries({
      queries: [
        {
          queryFn: () => getProductInfo(productId),
          queryKey: queryKeys.products.info(productId),
        },
        {
          queryFn: () => getProductDetail(productId),
          queryKey: queryKeys.products.detail(productId),
        },
        {
          queryFn: () => getProductHighlightReview(productId),
          queryKey: queryKeys.products.review(productId),
        },
        {
          queryFn: () => getProductWishCount(productId),
          queryKey: queryKeys.products.wish(productId),
        },
      ],
    });
  return {
    productInfo: productInfo.data,
    highlightReview: highlightReview.data,
    productDetail: productDetail.data,
    wishCount: wishCount.data,
  };
};
