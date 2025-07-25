import { rankingRankCategoryList, rankingTargetCategory } from "@/assets/rankingCategory";
import type { ProductRankingFilterOption } from "@/types/ProductType";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useRankingFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTarget, setSelectedTarget] = useState<ProductRankingFilterOption["targetType"]>(
    rankingTargetCategory[0].targetType,
  );
  const [selectedRank, setSelectedRank] = useState<ProductRankingFilterOption["rankType"]>(
    Object.keys(rankingRankCategoryList)[0] as ProductRankingFilterOption["rankType"],
  );

  const targetTypeParams = searchParams.get("targetType")?.trim();
  const rankTypeParams = searchParams.get("rankType")?.trim();

  const isValidTarget = targetTypeParams && rankingTargetCategory.some((item) => item.targetType === targetTypeParams);
  const isValidRank = rankTypeParams && rankTypeParams in rankingRankCategoryList;

  useEffect(() => {
    if (isValidTarget) {
      setSelectedTarget(targetTypeParams as ProductRankingFilterOption["targetType"]);
    }
    if (isValidRank) {
      setSelectedRank(rankTypeParams as ProductRankingFilterOption["rankType"]);
    }
  }, [isValidTarget, isValidRank, targetTypeParams, rankTypeParams]);

  const changeTargetType = useCallback(
    (targetType: ProductRankingFilterOption["targetType"]) => {
      setSelectedTarget(targetType);
      searchParams.set("targetType", targetType);
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );
  const changeRankType = useCallback(
    (rankType: ProductRankingFilterOption["rankType"]) => {
      setSelectedRank(rankType);
      searchParams.set("rankType", rankType);
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  return { selectedTarget, selectedRank, changeTargetType, changeRankType };
};

export default useRankingFilter;
