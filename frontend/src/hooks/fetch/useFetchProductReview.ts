import useFetchData from '@/hooks/fetch/useFetchData.ts';
import { PRODUCT_REVIEW_URL } from '@/api/api.ts';
import type { ReviewData } from '@/types/products/detail/reviewTypes.ts';

export default function useFetchProductReview(productId: number) {
  const { data } = useFetchData<ReviewData>(
    ['productReview', productId],
    PRODUCT_REVIEW_URL(productId),
  );

  return data.data;
}
