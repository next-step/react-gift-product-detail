import { useQuery, type QueryKey, type UseQueryOptions } from "@tanstack/react-query";
import { get } from "@/services/request";

interface UseFetchParams<T> {
  queryKey: QueryKey;
  url: string;
  queryParams?: Record<string, string>;
  options?: Omit<UseQueryOptions<T, Error, T>, "queryKey" | "queryFn">;
}

export function useFetch<T>({
  queryKey,
  url,
  queryParams,
  options,
}: UseFetchParams<T>) {
  return useQuery({
    queryKey,
    queryFn: () =>
      get<{ data: T }>(url, { queryParams }).then((res) => res.data),
    ...options,
  });
}
