import { useQuery } from '@tanstack/react-query';
import { getThemeList } from '@/Api/api';
import { queryKeys } from './queryKeys';

export const useThemeList = () =>
  useQuery({
    queryKey: queryKeys.themeList(),
    queryFn: getThemeList,
    staleTime: 10 * 60 * 1000,
  });
