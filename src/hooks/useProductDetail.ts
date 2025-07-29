import { useFetch } from "@/hooks/useFetch";
import QUERY_KEY from "@/constants/queryKey";
import { API } from "@/constants/api";
import type { ProductDetail } from "@/types/product";

export function useProductDetail(productId?: string) {
  return useFetch<ProductDetail>({
    queryKey: QUERY_KEY.PRODUCT_INFO(productId ?? ""),
    url: API.PRODUCT_INFO(productId ?? ""),
    options: {
      enabled: !!productId,
    },
  });
}
