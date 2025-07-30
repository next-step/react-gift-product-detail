import { useParams } from 'react-router-dom';
import { getProductHighlightReview } from '@/apis/product';
import { useQuery } from '@tanstack/react-query';

function useProductReview() {
  const { productId } = useParams();

  const { data: productReviewInfo, isLoading } = useQuery({
    queryKey: ['productReviewInfo', productId],
    queryFn: () => getProductHighlightReview(Number(productId)),
  });

  return {
    productReviewInfo,
    isLoading,
  };
}

export default useProductReview;
