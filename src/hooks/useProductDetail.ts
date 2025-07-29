import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ProductDetail } from '@/types/product';
import { getProductDetailUrl } from '@/hooks/constants/api';

const fetchProductDetail = async (
  productId: string
): Promise<ProductDetail> => {
  const res = await axios.get<{ data: ProductDetail }>(
    getProductDetailUrl(productId)
  );
  return res.data.data;
};

export const useProductDetail = (productId: string) =>
  useSuspenseQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
  });
