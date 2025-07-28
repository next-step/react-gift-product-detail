import { useQuery } from "@tanstack/react-query";
import { client } from "@/api/client";
import { QUERY_KEYS } from "@/constants/queryKeys";

interface ProductWishResponse {
  wishCount: number;
  isWished: boolean;
}

export const useProductWish = (productId?: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.wish(productId!),
    queryFn: async (): Promise<ProductWishResponse> => {
      const { data } = await client.get(`/api/products/${productId}/wish`);
      return data.data;
    },
    enabled: !!productId,
  });
};

