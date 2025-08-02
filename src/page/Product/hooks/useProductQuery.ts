import { productRequests } from '@/api/productRequests';
import { useSuspenseQuery } from '@tanstack/react-query';

const useProductQuery = (index: number) => {
  const { data } = useSuspenseQuery({
    queryKey: ['productData', index],
    queryFn: () => productRequests.fetchProduct(index),
  });
  return data;
};

export default useProductQuery;
