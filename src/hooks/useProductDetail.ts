import { useFetch } from "@/hooks/useFetch";
import QUERY_KEY from "@/constants/queryKey";
import { API } from "@/constants/api";

export function useProductDetail<T>(productId?: string) {
  return useFetch<T>({
    queryKey: QUERY_KEY.PRODUCT_INFO(productId ?? ""),
    url: API.PRODUCT_INFO(productId ?? ""),
    options: {
      enabled: !!productId,
    },
  });
}
