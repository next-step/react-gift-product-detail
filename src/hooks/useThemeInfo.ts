import { useQuery } from '@tanstack/react-query';
import type { ThemeInfo } from '../types/GiftTheme';
import { giftThemeInfoQueryOptions } from '../query/queryOptions';

export const useThemeInfo = (themeId: number) => {
  return useQuery<ThemeInfo, Error>(
    giftThemeInfoQueryOptions(themeId)
  );
};
