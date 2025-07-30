import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWishInfo } from '@/api/ProductWishApi';

export function useProductWish(productId: number) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['productWish', productId],
    queryFn: () => fetchWishInfo(productId),
  });

  const mutation = useMutation({
    mutationFn: (prev: { wishCount: number; isWished: boolean }) => {
      return Promise.resolve({
        isWished: !prev.isWished,
        wishCount: prev.isWished ? prev.wishCount - 1 : prev.wishCount + 1,
      });
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['productWish', productId] });

      const prevData = queryClient.getQueryData<{ wishCount: number; isWished: boolean }>([
        'productWish',
        productId,
      ]);

      if (prevData) {
        const newData = {
          isWished: !prevData.isWished,
          wishCount: prevData.isWished ? prevData.wishCount - 1 : prevData.wishCount + 1,
        };
        queryClient.setQueryData(['productWish', productId], newData);
      }

      return { previousData: prevData };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['productWish', productId], context.previousData);
      }
    },
  });

  return {
    wishCount: data?.wishCount ?? 0,
    isWished: data?.isWished ?? false,
    isLoading,
    toggleWish: () =>
      mutation.mutate({ wishCount: data?.wishCount ?? 0, isWished: data?.isWished ?? false }),
  };
}
