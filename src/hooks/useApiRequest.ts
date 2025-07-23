import { useQuery, useMutation } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

interface RequestConfig<T = any> extends AxiosRequestConfig {
  url: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  data?: T;
  queryOptions?: UseQueryOptions<T, Error>;
  mutationOptions?: UseMutationOptions<T, Error, any>;
}

export function useApiRequest<T>({
  url,
  method = "get",
  data,
  queryOptions,
  mutationOptions,
  ...config
}: RequestConfig<T>):
  | UseQueryResult<T, Error>
  | UseMutationResult<T, Error, any, unknown> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL + url;

  const query = useQuery<T, Error>({
    queryKey: [baseUrl, config.params, data],
    queryFn: async () => {
      const res = await axios.request<{ data: T }>({
        url: baseUrl,
        method,
        data,
        ...config,
      });
      return res.data.data;
    },
    enabled: method === "get",
    ...queryOptions,
  });

  const mutation = useMutation<T, Error, any>({
    mutationFn: async (body: any) => {
      const res = await axios.request<{ data: T }>({
        url: baseUrl,
        method,
        data: body,
        ...config,
      });
      return res.data.data;
    },
    ...mutationOptions,
  });

  return method === "get" ? query : mutation;
}
