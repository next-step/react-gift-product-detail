import { useQueries } from '@tanstack/react-query';
import {
  getProductDetail,
  getProductDescription,
  getProductHighlightReview,
  getProductWish,
} from '@/api/product';

const useProductDetail = (productId: number) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['productDetail', productId],
        queryFn: () => getProductDetail(productId),
        enabled: !!productId,
      },
      {
        queryKey: ['productDescription', productId],
        queryFn: () => getProductDescription(productId),
        enabled: !!productId,
      },
      {
        queryKey: ['productHighlightReview', productId],
        queryFn: () => getProductHighlightReview(productId),
        enabled: !!productId,
      },
      {
        queryKey: ['productWish', productId],
        queryFn: () => getProductWish(productId),
        enabled: !!productId,
      },
    ],
  });

  const isLoading = results.some((query) => query.isLoading);
  const isError = results.some((query) => query.isError);
  const error = results.find((query) => query.isError)?.error || null;

  const product = results[0].data?.data;
  const description = results[1].data?.data;
  const highlightReview = results[2].data?.data;
  const wish = results[3].data?.data;

  return {
    product,
    description,
    highlightReview,
    wish,
    isLoading,
    isError,
    error,
  };
};

export default useProductDetail;
