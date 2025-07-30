import { requests } from '@/api/requests';
import { ROUTE_PATH } from '@/routes/routePath';
import type { ProductSummaryData } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useProductSummary = (id: string) => {
  const navigate = useNavigate();
  const { data, error } = useQuery<ProductSummaryData>({
    queryKey: ['summaryData', id],
    queryFn: () => requests.fetchSummary(id),
  });

  useEffect(() => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status &&
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      navigate(ROUTE_PATH.HOME);
    }
  }, [error, navigate]);

  return data;
};
export default useProductSummary;
