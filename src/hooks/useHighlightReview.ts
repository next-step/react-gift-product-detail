import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { HighlightReview } from '@/types/product';
import { getHighlightReviewUrl } from '@/hooks/constants/api';
import { ERROR_MESSAGES } from '@/constants/validation';

export const useHighlightReview = (productId: string | undefined) => {
  return useQuery<HighlightReview>({
    queryKey: ['highlightReview', productId],
    queryFn: async () => {
      const res = await axios.get<{ data: HighlightReview }>(
        getHighlightReviewUrl(productId!)
      );
      const highlightReview = res.data.data;

      if (!highlightReview) {
        throw new Error(ERROR_MESSAGES.FAILED_TO_LOAD_HIGHLIGHT_REVIEW);
      }

      return highlightReview;
    },
    enabled: !!productId,
  });
};
