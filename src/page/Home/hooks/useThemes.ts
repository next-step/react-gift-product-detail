import { themeRequests } from '@/api/themeRequests';
import type { ThemeInfo } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

const useThemes = () => {
  const { data } = useSuspenseQuery<ThemeInfo[]>({
    queryKey: ['themeDatas'],
    queryFn: themeRequests.fetchTheme,
  });

  return data;
};

export default useThemes;
