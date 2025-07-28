import { useMemo } from "react";
import { useOrderForm } from "@/hooks/order";

export const useOrderCalculation = (productPrice?: number) => {
  const { watch } = useOrderForm();
  const receivers = watch("receivers");

  const totalQuantity = useMemo(() => {
    if (!receivers || receivers.length === 0) {
      return 0;
    }

    return receivers.reduce((total, receiver) => {
      return total + (receiver.quantity || 0);
    }, 0);
  }, [receivers]);

  const totalPrice = useMemo(() => {
    if (!productPrice || !receivers || receivers.length === 0) {
      return 0;
    }

    return productPrice * totalQuantity;
  }, [productPrice, totalQuantity, receivers]);

  return {
    totalPrice,
    totalQuantity,
  };
};
