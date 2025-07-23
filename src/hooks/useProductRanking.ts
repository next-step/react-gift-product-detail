import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchProductRanking,
  type RankType,
  type TargetType,
} from "@/api/product";
import type { Product } from "@/types/product";

export const useProductRanking = (
  targetType: TargetType,
  rankType: RankType,
) => {
  const { data: products } = useSuspenseQuery<Product[]>({
    queryKey: ["productRanking", targetType, rankType],
    queryFn: () => fetchProductRanking(targetType, rankType),
  });

  return {
    products,
  };
};
