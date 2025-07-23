import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "@/api/order";
import type { OrderRequest, OrderResponse } from "@/api/order";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useOrder = () => {
  const navigate = useNavigate();

  const mutation = useMutation<OrderResponse, string, OrderRequest>({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success(ERROR_MESSAGES.ORDER.SUCCESS);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error ?? ERROR_MESSAGES.ORDER.FAIL);
    },
  });

  return {
    submitOrder: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
