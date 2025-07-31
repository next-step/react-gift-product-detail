import type { ProductWishCountResponseBody } from "@/api/product/types";
import { queryKeys } from "@/lib/query-keys";
import { queryClient } from "@/query-client";
import { useMutation } from "@tanstack/react-query";

export const useFakeWish = () => {
  return useMutation({
    mutationFn: async () => {
      return Promise.resolve();
    },
    onMutate: async (productId: number) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.products.wish(productId),
      });

      const previousWishData = queryClient.getQueryData(
        queryKeys.products.wish(productId),
      );

      queryClient.setQueryData(
        queryKeys.products.wish(productId),
        (old: ProductWishCountResponseBody) => ({
          ...old,
          isWished: !old.isWished,
          wishCount: old.isWished ? old.wishCount - 1 : old.wishCount + 1,
        }),
      );

      return { previousWishData };
    },
    onError: (_err, productId, context) => {
      if (context?.previousWishData) {
        queryClient.setQueryData(
          queryKeys.products.wish(productId),
          context.previousWishData,
        );
      }
    },
  });
};
