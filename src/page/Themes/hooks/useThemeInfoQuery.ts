import { requests } from '@/api/requests';
import type { ThemeIdInfoData } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

const useThemeInfoQuery = (index: number) => {
  return useSuspenseQuery<ThemeIdInfoData>({
    queryKey: ['themeIdInfoData', index],
    queryFn: () => requests.fetchThemeIdInfo(index),
  });
};

export default useThemeInfoQuery;
