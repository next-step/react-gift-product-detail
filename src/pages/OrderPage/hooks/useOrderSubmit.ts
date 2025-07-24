import { useAuth } from "@/contexts/AuthContext";
import { createOrder } from "@/data/api";
import type { Order } from "@/types/Order";
import type { Receiver } from "@/types/Receiver";
import type { OrderCardType } from "@/types/OrderCardType";
import type { ProductInfoSummary } from "@/types/ProductInfoSummary";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ROUTES } from "@/constants/routes";
import { ORDER_MESSAGES } from "../constants/alert";
import { isUnauthorized } from "@/constants/httpStatus";
import { useMutation } from "@tanstack/react-query";

interface UseOrderSubmitProps {
  validateAllForms: () => Promise<boolean>;
  setIsSubmittedOnce: React.Dispatch<React.SetStateAction<boolean>>;
  getFormValues: () => {
    senderName: string;
    cardMessage: string;
    totalQuantity: number;
  };
  receivers: Receiver[];
  messageCard: OrderCardType;
  product: ProductInfoSummary | undefined;
}

export const useOrderSubmit = ({
  validateAllForms,
  setIsSubmittedOnce,
  getFormValues,
  receivers,
  messageCard,
  product,
}: UseOrderSubmitProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const orderMutation = useMutation({
    mutationFn: (order: Order) => createOrder(user?.authToken || "", order),
    onSuccess: () => {
      navigate(ROUTES.HOME);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status && isUnauthorized(error.response?.status)) {
          navigate(ROUTES.LOGIN);
        }
      }
    },
  });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await validateAllForms();

    if (!isValid) {
      setIsSubmittedOnce(true);
    }

    if (isValid) {
      const formValues = getFormValues();
      alert(
        ORDER_MESSAGES.ORDER_COMPLETE_TEMPLATE({
          productName: product?.name || "",
          totalQuantity: formValues.totalQuantity,
          senderName: formValues.senderName,
          cardMessage: formValues.cardMessage,
        })
      );

      const transformedReceivers = receivers.map((receiver) => ({
        ...receiver,
        quantity: Number(receiver.quantity),
      }));

      const orderData: Order = {
        productId: product?.id || 0,
        message: formValues.cardMessage,
        messageCardId: messageCard.id.toString(),
        ordererName: formValues.senderName,
        receivers: transformedReceivers,
      };

      orderMutation.mutate(orderData);
      return;
    }
  };

  return {
    onSubmitHandler,
  };
};
