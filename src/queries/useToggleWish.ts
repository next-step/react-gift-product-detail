import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { type WishInfo } from '@/Api/api';

export const useToggleWish = (productId: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => Promise.resolve(),

    onMutate: async () => {
      const key = queryKeys.productWish(productId);
      await qc.cancelQueries({ queryKey: key });

      const prev = qc.getQueryData<WishInfo>(key);
      if (prev) {
        qc.setQueryData<WishInfo>(key, {
          wishCount: prev.isWished ? prev.wishCount - 1 : prev.wishCount + 1,
          isWished: !prev.isWished,
        });
      }
      return { prev };
    },

    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(queryKeys.productWish(productId), ctx.prev);
    },
  });
};
