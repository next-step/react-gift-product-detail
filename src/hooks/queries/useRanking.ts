import { useQuery } from "@tanstack/react-query";
import { fetchRanking } from "@/api/ranking";
import type { RankType, TargetType, RankingItem } from "@/api/ranking";

interface UseRankingParams {
  targetType: TargetType;
  rankType: RankType;
}

export const useRanking = ({ targetType, rankType }: UseRankingParams) => {
  return useQuery<RankingItem[], Error>({
    queryKey: ["ranking", targetType, rankType],
    queryFn: () => fetchRanking({ targetType, rankType }),
  });
};
