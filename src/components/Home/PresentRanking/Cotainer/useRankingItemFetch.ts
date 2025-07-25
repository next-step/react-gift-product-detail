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
  const { data, error, isLoading } = useQuery<Good[]>({
    queryKey: ['ranking', { params }],
    queryFn: () => getFetch(params),
  });
  const notNulldata = data ?? null;
  //TODO
  //여기서 리턴하는 data를 props로 받는 PresnetRankignItem.tsx에서 props의 타입 선언을 Good[] || null로 선언하였지만
  //useQuery()가 리턴하는 data의 타입은 Goods[] || undefined 이여서 타입 불일치 에러가 발생
  //해결방법으로 undefined 타입 체크를 여기서 사용하였지만 다른 해결방법으로는
  // 1. PresentRankingItem.tsx의 타입을 Good[] || undefined 로 선언해보기가 있을 것 같은데 undefined 자체가 개발자가 의도적으로 사용하는 것을
  //추천하지 않는 타입으로 알고 있는데 그러한 이유로 제가한 해결방법이 괜찮은건지 의문이 들어 질문 드립니다.

  return {
    notNulldata,
    error,
    isLoading,
  };
};
