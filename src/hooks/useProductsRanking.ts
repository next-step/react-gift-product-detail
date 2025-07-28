import { fetchProductsRanking } from "@/api/productsRanking";
import type { RankType, TargetType } from "@/types/gift";
import { useQuery } from "@tanstack/react-query";

type GiftsRenderParams = {
  targetType: TargetType;
  rankType: RankType;
};

const useProductsRanking = ({ targetType, rankType }: GiftsRenderParams) => {
  const {
    data: gifts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["gifts", targetType, rankType],
    queryFn: () => fetchProductsRanking({ targetType, rankType }),
    refetchOnWindowFocus: false,
  });

  return { gifts, isPending, isError };
};

export default useProductsRanking;
