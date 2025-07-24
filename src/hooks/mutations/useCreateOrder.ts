import { useMutation } from "@tanstack/react-query";
import { postCreateOrder } from "@/api/orderapi";
import type { OrderFormValues } from "@/validations/orderSchema";

export const useCreateOrder = ({
  productId,
  token,
}: {
  productId: number;
  token: string;
}) => {
  return useMutation({
    mutationFn: (data: OrderFormValues) => postCreateOrder(data, productId, token),
  });
};
