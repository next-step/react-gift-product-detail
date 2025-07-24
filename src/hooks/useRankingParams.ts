import { useSearchParams } from 'react-router-dom';
import {
  DEFAULT_VALUES,
  type TargetType,
  type RankType,
} from '@/constants/rankingParams';

const PARAM_KEYS = {
  TARGET_TYPE: 'targetType',
  RANK_TYPE: 'rankType',
} as const;

export const useRankingParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const targetType =
    (searchParams.get(PARAM_KEYS.TARGET_TYPE) as TargetType) ||
    DEFAULT_VALUES.targetType;

  const rankType =
    (searchParams.get(PARAM_KEYS.RANK_TYPE) as RankType) ||
    DEFAULT_VALUES.rankType;

  const setTargetType = (value: TargetType) => {
    searchParams.set(PARAM_KEYS.TARGET_TYPE, value);
    setSearchParams(searchParams);
  };

  const setRankType = (value: RankType) => {
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
