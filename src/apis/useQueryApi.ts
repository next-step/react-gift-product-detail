import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import apiClient from './httpClient';
import { handleApiError } from './queryClient';

export interface QueryApiOptions<TData>
  extends Omit<UseQueryOptions<TData, AxiosError>, 'queryKey' | 'queryFn'> {
  onError?: (error: AxiosError) => void;
}

const queryFnFactory =
  <TData>(url: string, options?: QueryApiOptions<TData>) =>
  async () => {
    try {
      const response = await apiClient.get<TData>(url);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      handleApiError(axiosError);

      if (options?.onError) {
        options.onError(axiosError);
      }

      throw axiosError;
    }
  };

export const useQueryApi = <TData>(
  queryKey: string[],
  url: string,
  options?: QueryApiOptions<TData>
) => {
  return useQuery<TData, AxiosError>({
    queryKey,
    queryFn: queryFnFactory<TData>(url, options),
    ...options,
  });
};

export const useSuspenseQueryApi = <TData>(
  queryKey: string[],
  url: string,
  options?: QueryApiOptions<TData>
) => {
  return useSuspenseQuery<TData, AxiosError>({
    queryKey,
    queryFn: queryFnFactory<TData>(url, options),
    ...options,
  });
};
