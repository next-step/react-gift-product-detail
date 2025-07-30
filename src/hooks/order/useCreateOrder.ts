import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/api/order/create-order";

export const useCreateOrder = () => {
  const orderMutation = useMutation({
    mutationFn: createOrder,
  });

  return {
    mutateOrder: orderMutation.mutate,
    isLoading: orderMutation.isPending,
    error: orderMutation.error,
  };
};
