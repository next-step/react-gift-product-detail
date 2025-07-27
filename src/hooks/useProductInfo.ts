import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchProductInfo } from "@/api/product";
import type { Product } from "@/types/product";

export const useProductInfo = (productId: number) => {
  const { data: product } = useSuspenseQuery<Product>({
    queryKey: ["productInfo", productId],
    queryFn: () => fetchProductInfo(productId),
  });

  return { product };
};
