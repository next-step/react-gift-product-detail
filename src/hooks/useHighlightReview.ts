import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { HighlightReview } from '@/types/product';
import { getHighlightReviewUrl } from '@/hooks/constants/api';

export const useHighlightReview = (productId: string | undefined) => {
  return useQuery<HighlightReview>({
    queryKey: ['highlightReview', productId],
    queryFn: async () => {
      const res = await axios.get<{ data: HighlightReview }>(
        getHighlightReviewUrl(productId!)
      );
      const result = res.data?.data;

      if (!result) {
        throw new Error('리뷰 정보를 불러올 수 없습니다.');
      }

      return result;
    },
    enabled: !!productId,
  });
};
