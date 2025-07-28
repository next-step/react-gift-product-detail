import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ProductWish } from '@/types/product';
import { getProductWishUrl } from '@/hooks/constants/api';

export const useProductWish = (productId: string | undefined) => {
  return useQuery<ProductWish>({
    queryKey: ['productWish', productId],
    queryFn: async () => {
      const res = await axios.get<{ data: ProductWish }>(
        getProductWishUrl(productId!)
      );
      const wish = res.data?.data;

      if (!wish) {
        throw new Error('상품 찜 정보를 불러올 수 없습니다.');
      }

      return wish;
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 10,
  });
};
