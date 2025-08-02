import { requests } from '@/api/requests';
import { useSuspenseQuery } from '@tanstack/react-query';

const useProductWish = (index: number) => {
  const { data } = useSuspenseQuery({
    queryKey: ['productWishData', index],
    queryFn: () => requests.fetchProductWish(index),
  });
  return data;
};

export default useProductWish;
