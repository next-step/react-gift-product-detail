import { useMutation, useQueryClient } from '@tanstack/react-query';

// 개발용 목업 API
async function toggleProductWish(productId: any) {
  return new Promise(resolve => 
    setTimeout(() => resolve({ success: true }), 100)
  );
}

export function useProductWishMutation(productId: any) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => toggleProductWish(productId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['productWish', productId] });
      const previous = queryClient.getQueryData(['productWish', productId]);
      // 낙관적 업데이트
      if (previous) {
        queryClient.setQueryData(['productWish', productId], (old: any) => ({
          ...old,
          isWish: !old.isWish,
          wishCount: old.wishCount + (old.isWish ? -1 : 1),
        }));
      }
      return { previous };
    },
    onError: () => {},
  });
}
