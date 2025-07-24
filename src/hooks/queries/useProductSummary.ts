import { useQuery } from "@tanstack/react-query";
import { getProductSummary } from "@/api/product";
import type { ProductSummary } from "@/api/product";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useProductSummary = (productId: number) => {
  return useQuery<ProductSummary, Error>({
    queryKey: QUERY_KEYS.productSummary(productId),
    queryFn: () => getProductSummary(productId),
  });
};