import { useQuery } from "@tanstack/react-query";
import { type ProductSummary, fetchProductSummary } from "@/api/product";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useProductSummary = (productId: number | undefined) => {
  const {
    data: product,
    isLoading: loading,
    isError,
  } = useQuery<ProductSummary, Error>({
    queryKey: ["productSummary", productId],
    queryFn: () => fetchProductSummary(productId!),
    enabled: !!productId,
  });

  return {
    product,
    loading,
    error: isError ? ERROR_MESSAGES.PRODUCT.FAIL_TO_LOAD : null,
  };
};
