import { useMutation } from "@tanstack/react-query";
import { postCreateOrder } from "@/api/orderapi";
import type { OrderFormValues } from "@/validations/orderSchema";
import type { AxiosResponse } from "axios";

interface UseCreateOrderProps {
  productId: number;
  token: string;
  onSuccess?: (
    data: AxiosResponse<{ data: { success: boolean } }>,
    variables: OrderFormValues
  ) => void;
  onError?: (message: string) => void;
}

export const useCreateOrder = ({
  productId,
  token,
  onSuccess,
  onError,
}: UseCreateOrderProps) => {
  return useMutation({
    mutationFn: (data: OrderFormValues) =>
      postCreateOrder(data, productId, token),
    onSuccess: (data, variables) => {
      onSuccess?.(data, variables);
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.data?.message ||
        "주문 요청 중 오류가 발생했습니다.";
      onError?.(msg);
    },
  });
};
