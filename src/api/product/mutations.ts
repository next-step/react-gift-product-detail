import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleWish } from './apis';
import { toast } from 'react-toastify';

/**
 * 상품 찜 토글을 위한 mutation 훅
 */
export const useWishMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string | number) => toggleWish(productId),

    onMutate: async (productId) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['productWish', productId] });

      // 이전 데이터 백업
      const previousWish = queryClient.getQueryData(['productWish', productId]);

      // 낙관적 업데이트
      queryClient.setQueryData(['productWish', productId], (old: any) => {
        if (!old?.data) return old;

        return {
          data: {
            wishCount: old.data.isWished
              ? old.data.wishCount - 1
              : old.data.wishCount + 1,
            isWished: !old.data.isWished,
          },
        };
      });

      return { previousWish };
    },

    onError: (error, productId, context) => {
      // 에러 시 이전 상태로 롤백
      if (context?.previousWish) {
        queryClient.setQueryData(
          ['productWish', productId],
          context.previousWish
        );
      }

      // 에러 메시지 표시
      console.log(`상품 ${productId} 찜 토글 실패:`, error); // productId 사용
      toast.error('찜하기에 실패했습니다.');
    },

    onSettled: (data, error, productId) => {
      // 완료 후 로깅
      console.log(`상품 ${productId} 찜 토글 완료:`, { data, error });
    },
  });
};
