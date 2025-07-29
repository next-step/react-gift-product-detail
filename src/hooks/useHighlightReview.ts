import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { HighlightReview } from '@/types/product';
import { getHighlightReviewUrl } from './constants/api';

const fetchHighlightReview = async (
  productId: string
): Promise<HighlightReview> => {
  const res = await axios.get<{ data: HighlightReview }>(
    getHighlightReviewUrl(productId)
  );
  return res.data.data;
};

export const useHighlightReview = (productId: string) =>
  useSuspenseQuery({
    queryKey: ['highlightReview', productId],
    queryFn: () => fetchHighlightReview(productId),
  });
