import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import apiClient from './httpClient';
import { handleApiError } from './queryClient';

export type MutationApiOptions<TData, TVariables> = Omit<
  UseMutationOptions<TData, AxiosError, TVariables>,
  'mutationFn'
>;

export const useMutationApi = <TData, TVariables = void>(
  method: 'post' | 'put' | 'delete',
  url: string,
  options?: MutationApiOptions<TData, TVariables>
) => {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      try {
        const response = await apiClient[method]<TData>(url, variables);
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;

        if (!url.includes('/wish')) {
          handleApiError(axiosError);
        }

        throw axiosError;
      }
    },
    ...options,
  });
};

export const usePostApi = <TData, TVariables = void>(
  url: string,
  options?: MutationApiOptions<TData, TVariables>
) => {
  return useMutationApi<TData, TVariables>('post', url, options);
};

export const usePutApi = <TData, TVariables = void>(
  url: string,
  options?: MutationApiOptions<TData, TVariables>
) => {
  return useMutationApi<TData, TVariables>('put', url, options);
};

export const useDeleteApi = <TData, TVariables = void>(
  url: string,
  options?: MutationApiOptions<TData, TVariables>
) => {
  return useMutationApi<TData, TVariables>('delete', url, options);
};
