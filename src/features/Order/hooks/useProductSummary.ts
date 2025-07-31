import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

const fetchProductSummary = async (productId: number | null) => {
  if (!productId) return null;

  try {
    const res = await api.get(`/products/${productId}/summary`);
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;

    if (error.response?.status === 404) {
      return null;
    }

    throw error;
  }
};

export const useProductSummary = (productId: number | null) => {
  const {
    data: product,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductSummary(productId),
    enabled: !!productId,
  });

  return {
    product,
    loading,
    error,
  };
};
