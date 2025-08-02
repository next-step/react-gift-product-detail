import { productRequests } from '@/api/productRequests';
import { useSuspenseQuery } from '@tanstack/react-query';

const useProductWish = (index: number) => {
  const { data } = useSuspenseQuery({
    queryKey: ['productWishData', index],
    queryFn: () => productRequests.fetchProductWish(index),
  });
  return data;
};

export default useProductWish;
