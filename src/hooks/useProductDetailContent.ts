import { useFetch } from "@/hooks/useFetch";
import QUERY_KEY from "@/constants/queryKey";
import { API } from "@/constants/api";
import type { ProductDetail } from "@/types/product";

export function useProductDetailContent(productId?: string) {
  return useFetch<ProductDetail>({
    queryKey: QUERY_KEY.PRODUCT_DETAIL(productId ?? ""),
    url: API.PRODUCT_DETAIL(productId ?? ""),
    options: {
      enabled: !!productId,
    },
  });
}
