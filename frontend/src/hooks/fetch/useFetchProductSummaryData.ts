import { PRODUCT_SUMMARY_URL } from '@/api/api.ts';
import useFetchData from '@/hooks/fetch/useFetchData.ts';
import type { SelectedItemInfo } from '@/types/order/types.ts';

export default function useFetchProductSummaryData(id: number) {
  const { data, isLoading, error } = useFetchData<SelectedItemInfo>(
    ['product', id],
    PRODUCT_SUMMARY_URL(id),
  );

  return {
    product: data?.data,
    loading: isLoading,
    error,
  };
}
