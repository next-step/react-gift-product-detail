import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

interface ApiMutationOptions {
  url: string;
  method?: "post" | "put" | "patch" | "delete";
}

export function useApiMutation<T>({
  url,
  method = "post",
}: ApiMutationOptions) {
  const { userInfo } = useAuth();
  const baseUrl = import.meta.env.VITE_API_BASE_URL + url;
  return useMutation<T, Error, any>({
    mutationFn: async (body: any) => {
      const res = await axios.request<{ data: T }>({
        url: baseUrl,
        method,
        data: body,
        headers: userInfo?.authToken
          ? { Authorization: userInfo.authToken }
          : undefined,
      });
      return res.data.data;
    },
  });
}
