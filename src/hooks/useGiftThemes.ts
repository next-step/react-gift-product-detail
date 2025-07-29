import { useQuery } from '@tanstack/react-query';
import { giftThemesQueryOptions } from '../query/queryOptions';

export const useGiftThemes = () => {
  return useQuery(giftThemesQueryOptions());
};
