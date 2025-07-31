import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ProductWish } from '@/types/product';

export const useProductWishMutation = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => Promise.resolve(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['productWish', productId] });

      const prevData = queryClient.getQueryData(['productWish', productId]);

      queryClient.setQueryData(['productWish', productId], (old: ProductWish | undefined) => {
        if (!old) {
          return old;
        }

        const isWished = !old.isWished;
        const wishCount = old.wishCount + (isWished ? 1 : -1);

        return { ...old, isWished, wishCount };
      });

      return { prevData };
    },
    onError: (_err, _variables, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['productWish', productId], context.prevData);
      }
    },
    /* React Query가 상태를 invalidate하면서 서버값을 다시 가져오기때문에 주석처리해두었습니다.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['productWish', productId] });
    }
    */
  });
};
