import { useQuery } from "@tanstack/react-query";
import { get } from "@/services/request";

export function useFetch<T>(url: string, queryParams?: Record<string, string>) {
  return useQuery({
    queryKey: [url, queryParams],
    queryFn: () => get<{ data: T }>(url, { queryParams }).then(res => res.data),
  });
}
