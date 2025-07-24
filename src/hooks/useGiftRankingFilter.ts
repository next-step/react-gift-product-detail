import { rankType, targetType } from "@/data/giftType";
import { isValidRankType, isValidTargetType } from "@/utils/typeGuards";
import { useState } from "react";
import { useSearchParams } from "react-router";

const useGiftRankingFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const targetTypeParam = searchParams.get("targetType") || targetType[0].id;
  const rankTypeParam = searchParams.get("rankType") || rankType[0].id;
  const [selectedTypes, setSelectedTypes] = useState({
    targetType: isValidTargetType(targetTypeParam)
      ? targetTypeParam
      : targetType[0].id,
    rankType: isValidRankType(rankTypeParam) ? rankTypeParam : rankType[0].id,
  });

  const changeFilter = (key: string, selectedType: string) => {
    const newSelectedTypes = { ...selectedTypes, [key]: selectedType };
    setSelectedTypes(newSelectedTypes);

    const searchParams = new URLSearchParams(newSelectedTypes);
    setSearchParams(searchParams, { replace: true });
  };

  return {
    selectedTargetType: selectedTypes.targetType,
    selectedRankType: selectedTypes.rankType,
    changeFilter,
  };
};

export default useGiftRankingFilter;
