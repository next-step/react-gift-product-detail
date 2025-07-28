import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ProductDetail } from '@/types/product';
import { getProductDetailUrl } from '@/hooks/constants/api';
import { ERROR_MESSAGES } from '@/constants/validation';

export const useProductDetail = (productId: string | undefined) => {
  return useQuery<ProductDetail>({
    queryKey: ['productDetail', productId],
    queryFn: async () => {
      const res = await axios.get<{ data: ProductDetail }>(
        getProductDetailUrl(productId!)
      );
      const detail = res.data.data;

      if (!detail) {
        throw new Error(ERROR_MESSAGES.LOAD_PRODUCT_FAIL);
      }

      return detail;
    },
    enabled: !!productId,
  });
};
