import {
  productDetailOptions,
  productOptions,
  productReviewOptions,
  productWishOptions,
} from '@queries/product';
import {
  useMutation,
  useQueryClient,
  useSuspenseQueries,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useRef } from 'react';
import type { ProductId, ProductWishInfo } from 'src/types/product';
import { throttle } from 'lodash';

export const useProduct = (id: ProductId) => {
  const res = useSuspenseQueries({
    queries: [
      productOptions(id),
      productReviewOptions(id),
      productDetailOptions(id),
    ],
  });
  const product = res[0].data;
  const highlightReview = res[1].data;
  const productDetailInfo = res[2].data;

  const { productWishInfo, wishMutate, isPending } = useWish(id);

  return {
    product,
    highlightReview,
    productDetailInfo,
    productWishInfo,
    wishMutate,
    isPending,
  };
};

// 연속 요청시 오류 발생 테스트용 함수
const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const fetchAddWishSuccess = async () => {
  await sleep(1000);
};

const fetchAddWishError = async () => {
  await sleep(1000);

  throw new Error('mock error response');
};

export const useWish = (id: ProductId) => {
  const queryClient = useQueryClient();
  const { queryKey, queryFn } = productWishOptions(id);
  const { data: productWishInfo } = useSuspenseQuery({ queryKey, queryFn });

  const prevStackRef = useRef<ProductWishInfo[]>([]);

  const { mutate: wishMutate, isPending } = useMutation({
    mutationFn: fetchAddWishError,

    onMutate: async () => {
      // 현재 쿼리 중단 및 이전 값 백업
      await queryClient.cancelQueries({ queryKey });
      const prev = queryClient.getQueryData(queryKey);

      //이전 상태를 스택에 저장
      if (prev) {
        prevStackRef.current.push(prev);
      }

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
      // if (context?.prev) {
      //   queryClient.setQueryData(queryKey, context.prev);
      // }
      const prev = prevStackRef.current.pop();
      if (prev) queryClient.setQueryData(queryKey, prev);
    },

    // 성공/실패 시
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey });
    },
  });

  return { productWishInfo, wishMutate, isPending };
};
