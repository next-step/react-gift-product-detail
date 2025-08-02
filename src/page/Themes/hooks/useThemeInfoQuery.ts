import { themeRequests } from '@/api/themeRequests';
import type { ThemeIdInfoData } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

const useThemeInfoQuery = (index: number) => {
  return useSuspenseQuery<ThemeIdInfoData>({
    queryKey: ['themeIdInfoData', index],
    queryFn: () => themeRequests.fetchThemeIdInfo(index),
  });
};

export default useThemeInfoQuery;
