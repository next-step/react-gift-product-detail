import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "@/api/productDetail";
import type { ProductDetail } from "@/api/productDetail";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useProductDetail = (productId: number) => {
  return useQuery<ProductDetail, Error>({
    queryKey: QUERY_KEYS.productDetail(productId),
    queryFn: () => getProductDetail(productId),
  });
};
