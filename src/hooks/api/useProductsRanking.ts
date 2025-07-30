import { fetchProductsRanking } from "@/api/productsRanking";
import type { RankType, TargetType } from "@/types/gift";
import { useSuspenseQuery } from "@tanstack/react-query";

type GiftsRenderParams = {
  targetType: TargetType;
  rankType: RankType;
};

const useProductsRanking = ({ targetType, rankType }: GiftsRenderParams) => {
  const { data: gifts, isError } = useSuspenseQuery({
    queryKey: ["gifts", targetType, rankType],
    queryFn: () => fetchProductsRanking({ targetType, rankType }),
    refetchOnWindowFocus: false,
  });

  return { gifts, isError };
};

export default useProductsRanking;
