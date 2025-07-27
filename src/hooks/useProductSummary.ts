import { useSuspenseQuery } from "@tanstack/react-query";
import { type ProductSummary, fetchProductSummary } from "@/api/product";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useProductSummary = (productId: number | undefined) => {
  if (!productId) {
    throw new Error(ERROR_MESSAGES.PRODUCT.INVALID);
  }

  const { data: product } = useSuspenseQuery<ProductSummary>({
    queryKey: ["productSummary", productId],
    queryFn: () => fetchProductSummary(productId!),
  });

  return {
    product,
  };
};
