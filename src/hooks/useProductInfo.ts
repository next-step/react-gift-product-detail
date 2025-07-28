import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Product } from '@/types/product';
import { getProductInfoUrl } from '@/hooks/constants/api';
import { ERROR_MESSAGES } from '@/constants/validation';

export const useProductInfo = (productId: string | undefined) => {
  return useQuery<Product>({
    queryKey: ['productInfo', productId],
    queryFn: async () => {
      const res = await axios.get<{ data: Product }>(
        getProductInfoUrl(productId!)
      );
      const product = res.data.data;

      if (!product) {
        throw new Error(ERROR_MESSAGES.LOAD_PRODUCT_FAIL);
      }

      return product;
    },
    enabled: !!productId,
  });
};
