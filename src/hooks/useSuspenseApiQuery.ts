import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

interface SuspenseApiQueryOptions {
  url: string;
  queryKey: any[];
  params?: any;
}

export function useSuspenseApiQuery<T>({
  url,
  queryKey,
  params,
}: SuspenseApiQueryOptions) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL + url;
  return useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      const res = await axios.get(baseUrl, { params });
      return res.data.data;
    },
  });
}
