import { useSuspenseApiQuery } from "@/hooks/useSuspenseApiQuery";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";
import type { Product } from "@/types/api_types";
import { useSearchParams } from "react-router-dom";

export function useProducts() {
  const [searchParams] = useSearchParams();
  const targetType = searchParams.get("targetType") ?? "ALL";
  const rankType = searchParams.get("rankType") ?? "MANY_WISH";

  const { data } = useSuspenseApiQuery<Product[]>({
    queryKey: [API_ENDPOINTS.RANKING, targetType, rankType],
    url: API_ENDPOINTS.RANKING,
    params: { targetType, rankType },
  });

  return { data };
}
