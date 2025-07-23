import { useQuery } from "@tanstack/react-query";
import { get } from "@/services/request";

type Params = {
  url: string;
  queryParams?: Record<string, string>;
  enabled?: boolean;
  suspense?: boolean;
}

export function useFetch<T>({
  url,
  queryParams,
  enabled = true,
}: Params) {
  return useQuery<T>({
    queryKey: [url, queryParams],
    queryFn: () => get<T>(url,{queryParams}),
    enabled,
  })
}