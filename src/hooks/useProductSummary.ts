import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '@/api/ProductApi';
import { useGoToHome } from './useGoTo';
import useToastOnError from './useToastOnError';
import type { ProductSummary } from '@/types/Product';

export function useProductSummary(productId: string | undefined) {
  const goToHome = useGoToHome();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<ProductSummary, Error>({
    queryKey: ['productSummary', productId],
    queryFn: () => fetchProduct(productId!),
    enabled: !!productId,
  });

  useToastOnError({
    error: isError,
    id: 'fetch-product-error',
    message: '상품 정보를 불러올 수 없습니다.',
    onError: goToHome,
  });

  return { product, loading: isLoading };
}
