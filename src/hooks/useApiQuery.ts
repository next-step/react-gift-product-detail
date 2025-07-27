import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ApiQueryOptions {
  url: string;
  queryKey: any[];
  params?: any;
  enabled?: boolean;
}

export function useApiQuery<T>({
  url,
  queryKey,
  params,
  enabled = true,
}: ApiQueryOptions): ReturnType<typeof useQuery<T, Error>> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL + url;
  return useQuery<T, Error>({
    queryKey,
    queryFn: async () => {
      const res = await axios.get(baseUrl, { params });
      return res.data.data;
    },
    enabled,
  });
}
