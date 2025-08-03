import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult, UseQueryOptions, QueryKey } from '@tanstack/react-query';

export function useReactQueryFetch<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options: Omit<UseQueryOptions<T, Error, T>, 'queryKey' | 'queryFn'> = {}
): UseQueryResult<T, Error> {
  return useQuery<T, Error, T>({
    queryKey,
    queryFn,
    ...options,
  });
}
