import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchProductSummary } from '@/apis/orderPage';
import type { Product } from '@/types/product';
import ROUTES from '@/constants/routes';
import { STALE_TIME } from '@/constants/apiReactQueryStaleTime';
import { QUERY_KEYS } from '@/constants/queryKey';

const DEFAULT_API_ERROR_MESSAGE = '요청에 실패했습니다.';

export const useFetchProduct = (productId?: string) => {
  const navigate = useNavigate();

  const fetcher = async () => {
    if (!productId) {
      return null;
    }

    try {
      const data = await fetchProductSummary(productId);
      return data;
    } catch (error: any) {
      const status = error?.response?.status;
      const errorMessage =
        error?.response?.data?.data?.message || DEFAULT_API_ERROR_MESSAGE;

      if (status >= 400 && status < 500) {
        toast.error(errorMessage);
        navigate(ROUTES.HOME);
        return null;
      }
      throw error;
    }
  };

  const { data } = useSuspenseQuery<Product | null>({
    queryKey: QUERY_KEYS.productSummary(productId),
    queryFn: fetcher,
    staleTime: STALE_TIME,
  });

  return { product: data ?? null };
};
