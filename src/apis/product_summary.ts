import axios from 'axios';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

const fetchProductSummary = async (
  productId: string,
  authToken: string
): Promise<ProductSummary> => {
  const response = await axios.get(`/api/products/${productId}/summary`, {
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  });

  if (!response.data?.data) {
    throw new Error('제품 데이터를 불러오지 못했습니다.');
  }

  return response.data.data;
};

export function useProductSummaryQuery(
  productId: string,
  authToken: string,
  options?: UseQueryOptions<ProductSummary, Error, ProductSummary>
) {
  return useQuery<ProductSummary, Error>({
    queryKey: ['productSummary', productId],
    queryFn: () => fetchProductSummary(productId, authToken),
    enabled: !!productId && !!authToken,
    ...options,
  });
}
