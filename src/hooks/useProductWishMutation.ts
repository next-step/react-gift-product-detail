import { useMutation, useQueryClient } from '@tanstack/react-query';

// 개발용 목업 API
async function toggleProductWish(_productId: any) {
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
    onError: (_error, _variables, context: any) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previous) {
        queryClient.setQueryData(['productWish', productId], context.previous);
      }
    },
    onSuccess: (data) => {
      // 성공 시 서버 데이터와 동기화
      if (data) {
        queryClient.setQueryData(['productWish', productId], (old: any) => ({
          ...old,
        }));
      }
    },
    onSettled: () => {
      // 성공/실패 관계없이 최종적으로 서버 데이터 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ['productWish', productId] });
    },
  });
}
