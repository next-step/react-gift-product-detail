import { useQuery } from '@tanstack/react-query';
import { fetchThemeInfo } from '@/api/themesApi';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { ThemeInfo } from '@/types/themeInfo';

export const useThemeInfo = (themeId?: number) => {
  return useQuery<ThemeInfo, Error>({
    queryKey: themeId ? QUERY_KEYS.themeInfo(themeId) : [],
    queryFn: () => fetchThemeInfo(themeId!),
    enabled: !!themeId,
  });
};