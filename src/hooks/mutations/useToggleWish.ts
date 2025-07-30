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
      const queryKey = QUERY_KEYS.productWish(productId);

      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<{
        wishCount: number;
        isWished: boolean;
      }>(queryKey);

      queryClient.setQueryData(queryKey, {
        wishCount: previous ? previous.wishCount + (isWished ? -1 : 1) : 1,
        isWished: !isWished,
      });

      return { previous, queryKey };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(context.queryKey, context.previous);
      }
    },
  });
};
