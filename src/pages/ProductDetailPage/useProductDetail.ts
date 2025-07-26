import { useParams } from 'react-router-dom';
import { useSuspenseQueryApi } from '@/apis/useQueryApi';
import { usePostApi, useDeleteApi } from '@/apis/useMutationApi';
import { useQueryClient } from '@tanstack/react-query';

interface Product {
  id: number;
  name: string;
  brandName: string;
  price: {
    originalPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

export const useProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useSuspenseQueryApi<{ data: Product }>(
    ['product', productId || ''],
    productId ? `/products/${productId}` : '',
    { enabled: !!productId }
  );
  const product = data.data;
  return { product };
};

interface ProductDetail {
  description: string;
  announcements: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
}

export const useProductDetailDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useSuspenseQueryApi<{ data: ProductDetail }>(
    ['product', productId || '', 'detail'],
    productId ? `/products/${productId}/detail` : '',
    { enabled: !!productId }
  );
  return data.data;
};

interface ProductReview {
  totalCount: number;
  reviews: {
    id: number;
    authorName: string;
    content: string;
  }[];
}

export const useProductDetailReview = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useSuspenseQueryApi<{ data: ProductReview }>(
    ['product', productId || '', 'review'],
    productId ? `/products/${productId}/highlight-review` : '',
    { enabled: !!productId }
  );
  return data.data;
};

interface ProductHeart {
  wishCount: number;
  isWished: boolean;
}

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
