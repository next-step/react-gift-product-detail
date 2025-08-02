import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleWish } from '@/apis/wish';
import { QUERY_KEYS } from '@/constants/queryKey';

export const useWishUpdateMutation = (productId: number) => {
  const queryClient = useQueryClient();

  // 과제 API 명세서에는 Wish를 업데이트 하는 항목이 정의되어 있지 않았음
  // 낙관적 업데이트의 예를 보여주기 위해 임의로 옳지 않은 경로로 POST 하여 에러를 발생시킴
  // 따라서 클릭 후 롤백에 의해 다시 원상태로 원복

  return useMutation({
    mutationFn: () => toggleWish(productId),
    retry: 1,
    retryDelay: 1000,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.productWish(productId),
      });

      const previous = queryClient.getQueryData(
        QUERY_KEYS.productWish(productId)
      );

      queryClient.setQueryData(
        QUERY_KEYS.productWish(productId),
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            isWished: !old.isWished,
            wishCount: old.isWished
              ? Math.max(old.wishCount - 1, 0)
              : old.wishCount + 1,
          };
        }
      );

      return { previous };
    },

    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          QUERY_KEYS.productWish(productId),
          context.previous
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.productWish(productId),
      });
    },
  });
};
