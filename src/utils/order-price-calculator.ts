import type { Receiver } from "@/contexts/order/order-schema";

export const orderPriceCalculator = (
  receivers: Receiver[] = [],
  productPrice: number = 0,
) => {
  const totalQuantity = receivers.reduce((total, receiver) => {
    return total + (receiver.quantity || 0);
  }, 0);

  const totalPrice = productPrice * totalQuantity;

  return {
    totalPrice,
    totalQuantity,
  };
};
