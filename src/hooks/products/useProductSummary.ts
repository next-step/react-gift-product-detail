import { getProductSummary } from "@/api/product";
import { queryKeys } from "@/lib/query-keys";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useProductSummary = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product } = useSuspenseQuery({
    queryKey: queryKeys.products.summary(Number(id)),
    queryFn: () => getProductSummary(Number(id)),
  });

  return {
    product,
    productId: Number(id),
  };
};
