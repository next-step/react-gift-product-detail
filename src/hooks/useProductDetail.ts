import { useSuspenseQuery } from '@tanstack/react-query';
import {
  getProductDetail,
  getProductDescription,
  getProductHighlightReview,
  getProductWish,
} from '@/api/product';

const useProductDetail = (productId: number) => {
  const { data: product } = useSuspenseQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductDetail(productId),
  });

  const { data: description } = useSuspenseQuery({
    queryKey: ['productDescription', productId],
    queryFn: () => getProductDescription(productId),
  });

  const { data: highlightReview } = useSuspenseQuery({
    queryKey: ['productHighlightReview', productId],
    queryFn: () => getProductHighlightReview(productId),
  });

  const { data: wish } = useSuspenseQuery({
    queryKey: ['productWish', productId],
    queryFn: () => getProductWish(productId),
  });

  return {
    product: product.data,
    description: description.data,
    highlightReview: highlightReview.data,
    wish: wish.data,
  };
};

export default useProductDetail;
