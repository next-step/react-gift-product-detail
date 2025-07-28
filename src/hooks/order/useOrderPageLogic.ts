import { useOrderValidation } from "@/hooks/order";
import { useProductSummary } from "@/hooks/products";
import { useCreateOrder } from "@/hooks/order";

export const useOrderPageLogic = () => {
  const {
    product,
    isLoading: isProductLoading,
    error: productError,
    productId,
  } = useProductSummary();

  const { validateAllFields, isOrderComplete } = useOrderValidation();

  const {
    submitOrder,
    isLoading: isOrderLoading,
    error: orderError,
  } = useCreateOrder(productId, product?.name);

  const handleOrderSubmit = async () => {
    const isValidForm = await validateAllFields();
    if (!isValidForm) return;

    if (!isOrderComplete()) return;

    await submitOrder();
  };

  return {
    product,
    handleOrderSubmit,
    isLoading: isProductLoading || isOrderLoading,
    error: productError || orderError,
  };
};
