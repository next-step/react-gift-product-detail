import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';

// 찜 상태를 토글하는 API 함수
const toggleWishApi = async (productId: number) => {
  // console.log(`Toggling wish for product ${productId}`);

  // 콘솔을 주석처리하면서 쓸 곳이 없어진 productId를 임시로 반환값에 포함
  return Promise.resolve({ success: true, productId });
};

import type { ProductWish } from '@/types/product';

export const useToggleWishMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => toggleWishApi(productId),
    onMutate: async productId => {
      // 진행중인 refetch를 취소하여 덮어쓰기 방지
      await queryClient.cancelQueries({ queryKey: queryKeys.products.wish(productId) });

      // 이전 찜 정보(캐시)를 가져옴
      const previousWishData = queryClient.getQueryData<ProductWish>(
        queryKeys.products.wish(productId),
      );

      // 새로운 찜 정보로 캐시를 즉시 업데이트
      if (previousWishData) {
        const newWishData = {
          ...previousWishData,
          isWished: !previousWishData.isWished,
          wishCount: previousWishData.isWished
            ? previousWishData.wishCount - 1
            : previousWishData.wishCount + 1,
        };
        queryClient.setQueryData(queryKeys.products.wish(productId), newWishData);
      }

      // 롤백에 사용할 이전 데이터를 반환
      return { previousWishData };
    },
    // 뮤테이션 실패 시, onMutate에서 반환된 데이터로 롤백
    onError: (err, productId, context) => {
      console.error(err);
      if (context?.previousWishData) {
        queryClient.setQueryData(queryKeys.products.wish(productId), context.previousWishData);
      }
    },
    // 뮤테이션 성공/실패 여부와 관계없이 항상 refetch
    onSettled: (_data, error) => {
      if (error) {
        console.error('An error occurred:', error);
      }
    },
  });
};