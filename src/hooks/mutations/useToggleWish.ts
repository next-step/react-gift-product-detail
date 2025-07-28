import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";

interface ToggleWishParams {
  productId: number;
  isWished: boolean;
}

export const useToggleWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => Promise.resolve(),

    onMutate: async ({ productId, isWished }: ToggleWishParams) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.wish(productId),
      });

      const previous = queryClient.getQueryData<{ wishCount: number; isWished: boolean }>(
        QUERY_KEYS.wish(productId)
      );

      queryClient.setQueryData(
        QUERY_KEYS.wish(productId),
        {
          wishCount: previous
            ? previous.wishCount + (isWished ? -1 : 1)
            : 1,
          isWished: !isWished,
        }
      );

      return { previous };
    },

    onError: (_err, { productId }, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          QUERY_KEYS.wish(productId),
          context.previous
        );
      }
    },
  });
};
