import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Product } from '@/types/product';
import { getProductInfoUrl } from '@/hooks/constants/api';

const fetchProductInfo = async (productId: string): Promise<Product> => {
  const res = await axios.get<{ data: Product }>(getProductInfoUrl(productId));
  return res.data.data;
};

export const useProductInfo = (productId: string) =>
  useSuspenseQuery({
    queryKey: ['productInfo', productId],
    queryFn: () => fetchProductInfo(productId),
  });
