import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { toast } from 'react-toastify';
import type { ProductWish } from '@/types/product';
import { ApiError } from '@/errors/ApiError';

// 찜 상태를 토글하는 API 함수
const toggleWishApi = async (productId: number) => {
  // console.log(`Toggling wish for product ${productId}`);
  return Promise.resolve({ success: true, productId });
};

export const useToggleWishMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => toggleWishApi(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.products.wish(productId) });
      const previousWishData = queryClient.getQueryData<ProductWish>(
        queryKeys.products.wish(productId),
      );
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
      return { previousWishData };
    },
    onError: (err, productId, context) => {
      if (context?.previousWishData) {
        queryClient.setQueryData(queryKeys.products.wish(productId), context.previousWishData);
      }
      if (err instanceof ApiError) {
        toast.error(err.message);
      } else {
        toast.error('찜하기에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
    onSettled: (_data, _error, productId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.wish(productId) });
    },
  });
};