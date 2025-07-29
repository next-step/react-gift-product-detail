import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { Good } from '@src/types/Goods';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getFetch = async (params: {
  targetType: string | null;
  rankType: string | null;
}): Promise<Good[]> => {
  const res = await axios.get(BASE_URL + BASIC_ENDPOINT.ranking, {
    params: {
      targetType: params.targetType,
      rankType: params.rankType,
    },
  });
  return res.data.data;
};
export const useRankingItemFetch = (params: {
  targetType: string | null;
  rankType: string | null;
}) => {
  const { data, isError, isLoading } = useQuery<Good[]>({
    queryKey: ['ranking', params],
    queryFn: () => getFetch(params),
    enabled: !!params.targetType && !!params.rankType, // null 체크
  });

  const notNulldata = data ?? null;

  return {
    notNulldata,
    isError,
    isLoading,
  };
};
