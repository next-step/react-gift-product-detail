import { useQuery } from "@tanstack/react-query";
import { getProductSummary } from "@/api/product";
import type { ProductSummary } from "@/api/product";

export const useProductSummary = (productId: number) => {
  return useQuery<ProductSummary, Error>({
    queryKey: ["productSummary", productId],
    queryFn: () => getProductSummary(productId),
    enabled: !!productId,
  });
};
