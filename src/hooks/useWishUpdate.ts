import { useMutation, useQueryClient } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/queryKey";
import type { WishResponse } from "@/hooks/useProductWish";
import { updateWish } from "@/services/wish";

export function useWishUpdate(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateWish(productId),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEY.PRODUCT_WISH(productId),
      });

      const previousWishData = queryClient.getQueryData<WishResponse>(
        QUERY_KEY.PRODUCT_WISH(productId),
      );

      if (previousWishData) {
        queryClient.setQueryData<WishResponse>(
          QUERY_KEY.PRODUCT_WISH(productId),
          {
            isWished: !previousWishData.isWished,
            wishCount:
              previousWishData.wishCount + (previousWishData.isWished ? -1 : 1),
          },
        );
      }

      return { previousWishData };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousWishData) {
        queryClient.setQueryData<WishResponse>(
          QUERY_KEY.PRODUCT_WISH(productId),
          context.previousWishData,
        );
      }
    },

    onSettled: () => {
      // queryClient.invalidateQueries({
      //   queryKey: QUERY_KEY.PRODUCT_WISH(productId),
      // });
    },
  });
}
