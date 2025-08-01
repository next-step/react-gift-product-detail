import { apiGet } from '@/lib/axios';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

const fetchProductSummary = async (productId: number) => {
  return await apiGet<ProductSummary>(`/products/${productId}/summary`);
};

export const useProductSummary = (productId: number): ProductSummary => {
  const { data: product } = useSuspenseQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductSummary(productId),
  });

  return product;
};
