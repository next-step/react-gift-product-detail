import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ProductDetail } from '@/types/product';
import { getProductDetailUrl } from '@/hooks/constants/api';

export const useProductDetail = (productId: string | undefined) => {
  return useQuery<ProductDetail>({
    queryKey: ['productDetail', productId],
    queryFn: async () => {
      const res = await axios.get<{ data: ProductDetail }>(
        getProductDetailUrl(productId!)
      );
      const detail = res.data?.data;
      console.log(res.data);

      if (!detail) {
        throw new Error('상품 상세 정보를 불러올 수 없습니다.');
      }

      return detail;
    },
    enabled: !!productId,
  });
};
