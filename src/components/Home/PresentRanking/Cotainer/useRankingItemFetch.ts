import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { Good } from '@src/types/Goods';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getFetch = async (params: string): Promise<Good[]> => {
  const res = await axios.get(BASE_URL + BASIC_ENDPOINT.ranking + params);
  const data = res.data.data;
  return data;
};
export const useRankingItemFetch = (params: string) => {
  const { data, isError, isLoading } = useQuery<Good[]>({
    queryKey: ['ranking', { params }],
    queryFn: () => getFetch(params),
  });
  const notNulldata = data ?? null;

  return {
    notNulldata,
    isError,
    isLoading,
  };
};
