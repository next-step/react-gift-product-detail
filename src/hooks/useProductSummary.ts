import { useQuery } from "@tanstack/react-query";
import { productSummary } from "@/services/order";

export function useProductSummary(productId: string) {
  return useQuery({
    queryKey: ["productSummary", productId],
    queryFn: () => productSummary(productId),
    enabled: !!productId,
  });
}
