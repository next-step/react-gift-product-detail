import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type ApiQueryParams<T> = {
  endpoint: string;
  queryKey: any[];
  params?: Record<string, string | number | null | undefined>;
  enabled?: boolean;
  select?: UseQueryOptions<T>['select'];
};

export const useApiQuery = <T = unknown>({
  endpoint,
  queryKey,
  params = {},
  enabled = true,
  select,
}: ApiQueryParams<T>) => {
  const { data, isError, isLoading } = useQuery<T>({
    queryKey,
    queryFn: async () => {
      const response = await axios.get(BASE_URL + endpoint, {
        params,
      });
      return response.data.data;
    },
    enabled,
    select,
  });

  const nullNotData = data ?? null;
  return { nullNotData, isError, isLoading };
};
