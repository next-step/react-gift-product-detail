import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getProductSummaryUrl } from '@/hooks/constants/api';
import { ERROR_MESSAGES } from '@/constants/validation';
import { ROUTES } from '@/constants/routes';

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export const useProductSummary = (id: string | undefined) => {
  const navigate = useNavigate();

  const query = useQuery<ProductSummary>({
    queryKey: ['product-summary', id],
    queryFn: async () => {
      if (!id) {
        navigate(ROUTES.NOT_FOUND);
        throw new Error('No ID');
      }

      const res = await fetch(getProductSummaryUrl(id));

      if (res.status === 404) {
        navigate(ROUTES.NOT_FOUND);
        throw new Error('Not Found');
      }

      if (!res.ok) {
        toast.error(ERROR_MESSAGES.LOAD_PRODUCT_FAIL, {
          toastId: 'product-load-fail',
        });
        navigate(ROUTES.HOME);
        throw new Error('Failed to fetch');
      }

      const json = await res.json();
      return json.data;
    },
    enabled: !!id,
    retry: false,
  });

  return {
    product: query.data,
    isLoading: query.isPending,
  };
};
