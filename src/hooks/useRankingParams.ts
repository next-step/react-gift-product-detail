import { useSearchParams } from 'react-router-dom';

const PARAM_KEYS = {
  TARGET_TYPE: 'targetType',
  RANK_TYPE: 'rankType',
} as const;

const DEFAULT_VALUES = {
  targetType: 'ALL',
  rankType: 'MANY_WISH',
} as const;

export const useRankingParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const targetType =
    searchParams.get(PARAM_KEYS.TARGET_TYPE) || DEFAULT_VALUES.targetType;
  const rankType =
    searchParams.get(PARAM_KEYS.RANK_TYPE) || DEFAULT_VALUES.rankType;

  const setTargetType = (value: string) => {
    searchParams.set(PARAM_KEYS.TARGET_TYPE, value);
    setSearchParams(searchParams);
  };

  const setRankType = (value: string) => {
    searchParams.set(PARAM_KEYS.RANK_TYPE, value);
    setSearchParams(searchParams);
  };

  return {
    targetType,
    rankType,
    setTargetType,
    setRankType,
  };
};
