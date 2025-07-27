import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchProductDetail } from "@/api/product";
import type { ProductDetail } from "@/types/product";

export const useProductDetail = (productId: number) => {
  const { data: detail } = useSuspenseQuery<ProductDetail>({
    queryKey: ["productDetail", productId],
    queryFn: () => fetchProductDetail(productId),
  });

  return { detail };
};
