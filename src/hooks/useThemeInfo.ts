import { useQuery } from '@tanstack/react-query';
import { giftThemeInfoQueryOptions } from '../query/queryOptions';

export const useThemeInfo = (themeId: number) => {
  return useQuery(giftThemeInfoQueryOptions(themeId));
};
