import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "@/api/order";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useOrder = () => {
  const navigate = useNavigate();

  const {
    mutateAsync: submitOrder,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success(ERROR_MESSAGES.ORDER.SUCCESS);
      navigate("/");
    },
    onError: (err: string) => {
      toast.error(err || ERROR_MESSAGES.ORDER.FAIL);
    },
  });

  return {
    submitOrder,
    isPending,
    isError,
    error,
  };
};
