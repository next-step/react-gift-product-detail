import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/constants/api";
import baseHttp from "@/services/baseHttp";
import QUERY_KEY from "@/constants/queryKey";

export function useWishUpdate(productId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await baseHttp.post(API.PRODUCT_WISH(productId));
      return res.data; 
    },
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEY.PRODUCT_WISH(productId), data);
    },
  });

  return mutation;
}
