import { useSuspenseApiQuery } from "@/hooks/useSuspenseApiQuery";
import type { ProductSummary } from "@/types/api_types";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";

export function useOrderProductSummary(productId: number) {
  return useSuspenseApiQuery<ProductSummary>({
    queryKey: [API_ENDPOINTS.PRODUCT_SUMMARY(productId), productId],
    url: API_ENDPOINTS.PRODUCT_SUMMARY(productId),
  });
}
