import { useSuspenseQuery } from '@tanstack/react-query';
import { getThemeInfo, type ThemeInfo, type ThemeID } from '@/apis/theme';

export function useThemeInfoQuery(themeId: ThemeID) {
  return useSuspenseQuery<ThemeInfo>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => getThemeInfo(themeId),
  });
}
