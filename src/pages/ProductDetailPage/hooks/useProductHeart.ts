import { useParams } from 'react-router-dom';
import { useSuspenseQueryApi } from '@/apis/useQueryApi';
import { usePostApi, useDeleteApi } from '@/apis/useMutationApi';
import { useQueryClient } from '@tanstack/react-query';
import type { ProductHeart } from '../types';

export const useProductDetailHeart = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useSuspenseQueryApi<{ data: ProductHeart }>(
    ['product', productId || '', 'heart'],
    productId ? `/products/${productId}/wish` : '',
    { enabled: !!productId }
  );
  return data.data;
};

export const useToggleHeart = () => {
  const { productId } = useParams<{ productId: string }>();
  const queryClient = useQueryClient();
  const heartQueryKey = ['product', productId || '', 'heart'];

  const addHeartMutation = usePostApi<{ data: ProductHeart }>(
    `/products/${productId}/wish`,
    {
      onMutate: async (): Promise<{ previousHeart: unknown }> => {
        const previousHeart = queryClient.getQueryData(heartQueryKey);

        queryClient.setQueryData(
          heartQueryKey,
          (old: { data: ProductHeart } | undefined) => ({
            data: {
              ...old?.data,
              isWished: true,
              wishCount: (old?.data?.wishCount || 0) + 1,
            },
          })
        );

        return { previousHeart };
      },
      onError: (_error, _variables, context) => {
        if ((context as { previousHeart: unknown })?.previousHeart) {
          queryClient.setQueryData(
            heartQueryKey,
            (context as { previousHeart: unknown }).previousHeart
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: heartQueryKey });
      },
    }
  );

  const removeHeartMutation = useDeleteApi<{ data: ProductHeart }>(
    `/products/${productId}/wish`,
    {
      onMutate: async (): Promise<{ previousHeart: unknown }> => {
        const previousHeart = queryClient.getQueryData(heartQueryKey);

        queryClient.setQueryData(
          heartQueryKey,
          (old: { data: ProductHeart } | undefined) => ({
            data: {
              ...old?.data,
              isWished: false,
              wishCount: Math.max(0, (old?.data?.wishCount || 0) - 1),
            },
          })
        );

        return { previousHeart };
      },
      onError: (_error, _variables, context) => {
        if ((context as { previousHeart: unknown })?.previousHeart) {
          queryClient.setQueryData(
            heartQueryKey,
            (context as { previousHeart: unknown }).previousHeart
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: heartQueryKey });
      },
    }
  );

  const toggleHeart = async () => {
    const currentHeart = queryClient.getQueryData(heartQueryKey) as
      | { data: ProductHeart }
      | undefined;
    const isCurrentlyWished = currentHeart?.data?.isWished;

    if (isCurrentlyWished) {
      await removeHeartMutation.mutateAsync();
    } else {
      await addHeartMutation.mutateAsync();
    }
  };

  return {
    toggleHeart,
    isLoading: addHeartMutation.isPending || removeHeartMutation.isPending,
  };
};
