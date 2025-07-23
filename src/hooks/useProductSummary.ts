import { useQuery } from "@tanstack/react-query";
import { type ProductSummary, fetchProductSummary } from "@/api/product";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useProductSummary = (productId: number | undefined) => {
  const {
    data: product,
    isLoading: loading,
    error,
  } = useQuery<ProductSummary, Error>({
    queryKey: ["productSummary", productId],
    queryFn: () => {
      if (!productId) {
        throw new Error(ERROR_MESSAGES.PRODUCT.INVALID);
      }
      return fetchProductSummary(productId);
    },
    enabled: !!productId,
  });

  return {
    product,
    loading,
    error: error ? ERROR_MESSAGES.PRODUCT.FAIL_TO_LOAD : null,
  };
};
