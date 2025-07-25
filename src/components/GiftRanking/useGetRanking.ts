import type { CategoryValue, SortValue } from './constants';
import { useSuspenseQueryApi } from '@/apis/useQueryApi';

type Product = {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

type ApiResponse = {
  data: Product[];
};

const useGetRanking = (targetType: CategoryValue, rankType: SortValue) => {
  const { data } = useSuspenseQueryApi<ApiResponse>(
    ['products', 'ranking', targetType, rankType],
    `/products/ranking?targetType=${targetType}&rankType=${rankType}`
  );

  return { products: data.data };
};

export default useGetRanking;
