import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ProductWish } from '@/types/product';
import { getProductWishUrl } from '@/hooks/constants/api';
import { ERROR_MESSAGES } from '@/constants/validation';

export const useProductWish = (productId: string | undefined) => {
  return useQuery<ProductWish>({
    queryKey: ['productWish', productId],
    queryFn: async () => {
      const res = await axios.get<{ data: ProductWish }>(
        getProductWishUrl(productId!)
      );
      const wish = res.data.data;

      if (!wish) {
        throw new Error(ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCT_WISH);
      }

      return wish;
    },
    enabled: !!productId,
    staleTime: 1_000 * 60 * 10,
  });
};
