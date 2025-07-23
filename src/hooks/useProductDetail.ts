import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/api/product";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useProductDetail = (productId: number | undefined) => {
  const {
    data: product,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => {
      if (!productId) {
        throw new Error(ERROR_MESSAGES.PRODUCT.INVALID);
      }
      return fetchProductById(productId);
    },
    enabled: !!productId,
  });

  return {
    product,
    loading,
    error: error instanceof Error ? error.message : null,
  };
};
