import { requests } from '@/api/requests';
import type { ProductSummaryData } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useRanking = (id: string) => {
  const { data, isError, error } = useQuery<ProductSummaryData>({
    queryKey: ['summaryData', id],
    queryFn: () => requests.fetchSummary(id),
  });

  return { productSummaryData: data, isError, error };
};
export default useRanking;
