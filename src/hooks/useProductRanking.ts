import { useQuery } from "@tanstack/react-query";
import {
  fetchProductRanking,
  type RankType,
  type TargetType,
} from "@/api/product";
import { ERROR_MESSAGES } from "@/constants/messages";
import type { Product } from "@/types/product";

export const useProductRanking = (
  targetType: TargetType,
  rankType: RankType,
) => {
  const {
    data: products = [],
    isLoading: loading,
    isError,
  } = useQuery<Product[], Error>({
    queryKey: ["productRanking", targetType, rankType],
    queryFn: () => fetchProductRanking(targetType, rankType),
  });

  return {
    products,
    loading,
    error: isError ? ERROR_MESSAGES.PRODUCT.FAIL_TO_LOAD : null,
  };
};
