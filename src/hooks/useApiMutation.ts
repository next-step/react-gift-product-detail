import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ApiMutationOptions {
  url: string;
  method?: "post" | "put" | "patch" | "delete";
}

export function useApiMutation<T>({
  url,
  method = "post",
}: ApiMutationOptions) {
  return useMutation<T, Error, any>({
    mutationFn: async (body: any) => {
      const res = await axios.request<{ data: T }>({
        url,
        method,
        data: body,
      });
      return res.data.data;
    },
  });
}
