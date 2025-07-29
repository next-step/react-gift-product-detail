import { useQuery, useSuspenseQuery, type UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
type ApiErrorResponse = {
  status: string;
  statusCode: number;
  message: string;
};
type ApiQueryParams<T> = {
  endpoint: string;
  queryKey: any[];
  params?: Record<string, string | number | null | undefined>;
  enabled?: boolean;
  select?: UseQueryOptions<T, AxiosError<ApiErrorResponse>>['select'];
};

export const useApiQuery = <T = unknown>({
  endpoint,
  queryKey,
  params = {},
  select,
}: ApiQueryParams<T>) => {
  const { data, isError, isLoading } = useSuspenseQuery<T, AxiosError<ApiErrorResponse>>({
    queryKey,
    queryFn: async ({ signal }) => {
      const response = await axios.get(BASE_URL + endpoint, {
        params,
        signal, // 요청 취소 신호
      });
      const responseData = response.data.data;

      if (
        responseData &&
        typeof responseData === 'object' &&
        'statusCode' in responseData &&
        responseData.statusCode >= 400
      ) {
        return responseData;
      }

      return responseData;
    },
    select,
  });

  const nullNotData = data ?? null;
  return { nullNotData, isError, isLoading };
};
