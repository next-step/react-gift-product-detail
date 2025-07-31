import { queryOptions, useQuery } from '@tanstack/react-query';
import { getRankingProducts } from '@/services/product';
import { queryKeys } from '@/constants/queryKeys';

export const productsOptions = (target: string, rankType: string) =>
  queryOptions({
    queryKey: queryKeys.products.list(target, rankType),
    queryFn: () => getRankingProducts(target, rankType),
    enabled: !!target && !!rankType,
  });

export const useProductsQuery = (target: string, rankType: string) => {
  return useQuery(productsOptions(target, rankType));
};
