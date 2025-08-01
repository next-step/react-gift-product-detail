import type { WishInfo } from '@/api/types/giftItem.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const fetchAddWishSuccess = async () => {
  await sleep(1000);
  return {
    status: 200,
    success: true,
    message: '위시 등록 성공',
  };
};

const fetchAddWishError = async () => {
  await sleep(1000);
  throw new Error('mock error response');
};

export const useWishMutation = (parsedId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchAddWishError,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['wish', { id: parsedId }] });

      const prevData = queryClient.getQueryData<WishInfo>(['wish', { id: parsedId }]);

      if (prevData) {
        queryClient.setQueryData<WishInfo>(['wish', { id: parsedId }], {
          ...prevData,
          isWished: !prevData.isWished,
          wishCount: prevData.isWished ? prevData.wishCount - 1 : prevData.wishCount + 1,
        });
      }
      return { prevData };
    },
    onError: (_err, _vars, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['wish', { id: parsedId }], context.prevData);
      }
    },
  });
};
