import { useQuery } from '@tanstack/react-query';
import { fetchThemeInfo } from '@/api/ThemeListApi';

export default function useThemeInfo(themeId: number) {
  return useQuery({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
    enabled: !!themeId,
  });
}
