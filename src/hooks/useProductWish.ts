import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ProductWish } from '@/types/product';
import { getProductWishUrl } from '@/hooks/constants/api';

const fetchProductWish = async (productId: string): Promise<ProductWish> => {
  const res = await axios.get<{ data: ProductWish }>(
    getProductWishUrl(productId)
  );
  return res.data.data;
};

export const useProductWish = (productId: string) =>
  useSuspenseQuery({
    queryKey: ['productWish', productId],
    queryFn: () => fetchProductWish(productId),
    staleTime: 1_000 * 60 * 10,
  });
