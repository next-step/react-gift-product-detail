import { useSuspenseQuery } from '@tanstack/react-query';
import { productRequests } from '@/api/productRequests';

const useProductDetailQuery = (index: number) => {
  const { data } = useSuspenseQuery({
    queryKey: ['productDetail', index],
    queryFn: () => productRequests.fetchProductDetail(index),
  });

  return data;
};

export default useProductDetailQuery;
