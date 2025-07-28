import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchThemeInfo, type ThemeInfo } from '@/api/theme';

export function useThemeInfo(themeId: string) {
  const {
    data: themeInfo,
  } = useSuspenseQuery<ThemeInfo, Error>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
  });

  return { themeInfo };
}
