import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleProductWish } from '@/api/services';
import type { ProductWish } from '@/types';

export const useToggleWishMutation = (productId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['productWish', productId];

  return useMutation({
    mutationFn: () => toggleProductWish(productId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousWishData = queryClient.getQueryData<ProductWish>(queryKey);

      if (previousWishData) {
        const newWishData = {
          ...previousWishData,
          isWished: !previousWishData.isWished,
          wishCount: previousWishData.isWished
            ? previousWishData.wishCount - 1
            : previousWishData.wishCount + 1,
        };
        queryClient.setQueryData(queryKey, newWishData);
      }
      return { previousWishData };
    },
    onError: (err, variables, context) => {
      if (context?.previousWishData) {
        queryClient.setQueryData(queryKey, context.previousWishData);
      }
    },
     onSettled: ( error) => {

      if (error) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};
