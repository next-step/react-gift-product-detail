import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductDetail } from "@/api/productDetail";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { ProductDetail } from "@/api/productDetail";

export const useProductDetail = (productId: number) => {
  return useSuspenseQuery<ProductDetail, Error>({
    queryKey: QUERY_KEYS.productDetail(productId),
    queryFn: () => getProductDetail(productId),
  });
};
