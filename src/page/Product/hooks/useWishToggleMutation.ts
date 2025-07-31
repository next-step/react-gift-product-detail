import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ProductWishData } from '@/types';

const simulateToggleRequest = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};

export const useWishToggleMutation = (index: number) => {
  const queryClient = useQueryClient();
  const queryKey = ['productWishData', index];

  return useMutation({
    mutationFn: simulateToggleRequest,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousWishData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData<ProductWishData>(queryKey, oldData => {
        if (!oldData) return;
        return {
          ...oldData,
          isWished: !oldData.isWished,
          wishCount: oldData.isWished ? oldData.wishCount - 1 : oldData.wishCount + 1,
        };
      });

      return { previousWishData };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousWishData) {
        queryClient.setQueryData(queryKey, context.previousWishData);
      }
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey });
    // },
  });
};
