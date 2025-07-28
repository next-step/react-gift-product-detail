import { useFetch } from "@/hooks/useFetch";
import { API } from "@/constants/api";
import QUERY_KEY from "@/constants/queryKey";

type WishResponse = {
  wishCount: number;
  isWished: boolean;
};

export function useProductWish(productId?: string) {
  return useFetch<WishResponse>({
    queryKey: QUERY_KEY.PRODUCT_WISH(productId ?? ""),
    url: API.PRODUCT_WISH(productId ?? ""),
    options: {
      enabled: !!productId,
    },
  });
}
