import { useQuery } from '@tanstack/react-query';
import { getThemeInfo } from '@/api/services';

export const useThemeInfoQuery = (themeId?: string) => {
  return useQuery({
    queryKey: ['themeInfo', themeId],
    queryFn: () => getThemeInfo(themeId!),
    enabled: !!themeId,
  });
};
