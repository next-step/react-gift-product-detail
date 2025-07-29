import { fetchProductsSummary } from "@/api/productSummary";
import { useSuspenseQuery } from "@tanstack/react-query";

type ProductsSummaryParams = {
  id: string | undefined;
};

const useProductsSummary = ({ id }: ProductsSummaryParams) => {
  const { data: gift, isError } = useSuspenseQuery({
    queryKey: ["gift", id],
    queryFn: () => fetchProductsSummary({ id: Number(id) }),
  });

  return { gift, isError };
};

export default useProductsSummary;
