import { useQuery } from '@tanstack/react-query';
import { getHighlightReview, type HighlightReviewData } from '@/Api/api';
import { queryKeys } from './queryKeys';

export const useHighlightReview = (productId: number | null | undefined) =>
  useQuery<HighlightReviewData>({
    queryKey: queryKeys.productHighlightReview(productId as number),
    queryFn: () => getHighlightReview(productId as number),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
