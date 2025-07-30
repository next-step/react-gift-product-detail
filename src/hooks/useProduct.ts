import {
  productDetailOptions,
  productOptions,
  productReviewOptions,
  productWishOptions,
} from '@queries/product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ProductId, ProductWishInfo } from 'src/types/product';

export const useProduct = (id: ProductId) => {
  const { data: product } = useQuery(productOptions(id));
  const { data: highlightReview } = useQuery(productReviewOptions(id));
  const { data: productDetailInfo } = useQuery(productDetailOptions(id));
  const { productWishInfo, wishMutate } = useWish(id);

  return {
    product,
    highlightReview,
    productDetailInfo,
    productWishInfo,
    wishMutate,
  };
};

export const useWish = (id: ProductId) => {
  const queryClient = useQueryClient();
  const { queryKey, queryFn } = productWishOptions(id);
  const { data: productWishInfo } = useQuery({ queryKey, queryFn });

  const { mutate: wishMutate } = useMutation({
    mutationFn: () => Promise.resolve(), // 해당 API가 없음, 실제

    onMutate: async () => {
      // 현재 쿼리 중단 및 이전 값 백업
      await queryClient.cancelQueries({ queryKey });
      const prev = queryClient.getQueryData(queryKey);

      //낙관적 업데이트
      queryClient.setQueryData(
        queryKey,
        (info: ProductWishInfo | undefined) => {
          if (!info) return { wishCount: 1, isWished: true };

          const isCurrentlyWished = info.isWished;

          // 토글 로직
          return {
            wishCount: info.wishCount + (isCurrentlyWished ? -1 : 1),
            isWished: !isCurrentlyWished,
          };
        }
      );
      const optimisticData = queryClient.getQueryData(queryKey);
      console.log('After optimistic update:', optimisticData);

      return { prev };
    },
    onError: (_err, _variables, context) => {
      console.log('err');
      if (context?.prev) {
        queryClient.setQueryData(queryKey, context.prev);
      }
    },
  });

  return { productWishInfo, wishMutate };
};
