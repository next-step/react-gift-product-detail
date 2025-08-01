import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';

// 찜 상태를 토글하는 API 함수 (실제 구현 필요)
const toggleWishApi = async (productId: number) => {
  // 목 서버에는 실제 토글 API가 없으므로, 성공을 가정하고 Promise.resolve() 사용
  console.log(`Toggling wish for product ${productId}`);
  return Promise.resolve({ success: true });
};

export const useToggleWishMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => toggleWishApi(productId),
    onSuccess: (_data, variables) => {
      // 뮤테이션 성공 시, 해당 상품의 찜 정보 쿼리를 무효화하여 reload
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.wish(variables),
      });
    },
  });
};