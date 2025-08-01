import { apiGet } from '@/lib/axios';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { ThemeInfo } from '../ThemeHero/ThemeTypes';

const fetchThemeInfo = async (themeId: number): Promise<ThemeInfo> => {
  return await apiGet<ThemeInfo>(`/themes/${themeId}/info`);
};

export const useThemeInfo = (themeId: number | null): ThemeInfo | null => {
  if (themeId === null) return null;

  const { data: themeInfo } = useSuspenseQuery({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
  });

  return themeInfo;
};
