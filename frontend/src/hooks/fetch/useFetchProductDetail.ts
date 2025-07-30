import useFetchData from '@/hooks/fetch/useFetchData.ts';
import { PRODUCT_DETAIL_URL } from '@/api/api.ts';
import type { ProductDetailData } from '@/types/products/detail/infoTypes.ts';

export default function useFetchProductDetail(productId: number) {
  const { data } = useFetchData<ProductDetailData>(
    ['productData', productId],
    PRODUCT_DETAIL_URL(productId),
  );

  return {
    data: data?.data,
    announcements: data?.data.announcements,
  };
}
