import { productRequests } from '@/api/productRequests';
import { useSuspenseQuery } from '@tanstack/react-query';

const useProductReviewQuery = (index: number) => {
  const { data } = useSuspenseQuery({
    queryKey: ['productReviewData', index],
    queryFn: () => productRequests.fetchProductReview(index),
  });
  return data;
};

export default useProductReviewQuery;
