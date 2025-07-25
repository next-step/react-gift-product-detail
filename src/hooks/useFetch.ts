import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { get } from "@/services/request";

export function useFetch<T>(
  url: string, 
  queryParams?: Record<string, string>,
  options?: Omit<UseQueryOptions<T, Error, T>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: [url, queryParams],
    queryFn: () =>
      get<{ data: T }>(url, { queryParams }).then((res) => res.data),
    ...options,
  });
}
