import { queryOptions, useQuery } from '@tanstack/react-query';
import { getThemeInfo } from '@/services/theme';
import { queryKeys } from '@/constants/queryKeys';
import type { Theme } from '@/types/theme';

export const themeInfoOptions = (themeId: number) =>
  queryOptions<Theme, Error>({
    queryKey: queryKeys.themes.detail(themeId),
    queryFn: () => getThemeInfo(themeId),
    enabled: !!themeId,
  });

export const useThemeInfoQuery = (
  themeId: number,
  options?: {
    meta: { showToast: boolean };
    onError: (err: Error) => void;
  },
) => {
  return useQuery({ ...themeInfoOptions(themeId), ...options });
};
