import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductSummary } from '@/api/product';
import type { ProductSummary } from '@/api/product';
import toast from 'react-hot-toast';

export const useProductSummary = (productId?: number) => {
  const navigate = useNavigate();
  const {
    data: product,
    isError,
    error,
    isLoading,
  } = useQuery<ProductSummary, Error>({
    queryKey: ['productSummary', productId],
    queryFn: () => getProductSummary(productId!),
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
      navigate('/');
    }
  }, [isError, error, navigate]);

  return { product, isLoading };
};
