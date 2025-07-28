import { fetchProductsSummary } from "@/api/productSummary";
import { useQuery } from "@tanstack/react-query";

type ProductsSummaryParams = {
  id: string | undefined;
};

const useProductsSummary = ({ id }: ProductsSummaryParams) => {
  const {
    data: gift,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["gift", id],
    queryFn: () => fetchProductsSummary({ id: Number(id) }),
    enabled: !!id,
  });

  return { gift, isPending, isError };
};

export default useProductsSummary;
