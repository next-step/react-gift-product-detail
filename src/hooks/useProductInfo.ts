import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Product } from '@/types/product';
import { getProductInfoUrl } from './constants/api';

export const useProductInfo = (productId: string | undefined) => {
  return useQuery<Product>({
    queryKey: ['productInfo', productId],
    queryFn: async () => {
      const res = await axios.get<{ data: Product }>(
        getProductInfoUrl(productId!)
      );
      const product = res.data?.data;

      if (!product) {
        throw new Error('상품 정보를 불러올 수 없습니다.');
      }

      return product;
    },
    enabled: !!productId,
  });
};
