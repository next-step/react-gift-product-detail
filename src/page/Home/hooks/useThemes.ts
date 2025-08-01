import { requests } from '@/api/requests';
import type { ThemeInfo } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

const useThemes = () => {
  const { data } = useSuspenseQuery<ThemeInfo[]>({
    queryKey: ['themeDatas'],
    queryFn: requests.fetchTheme,
  });

  return { themes: data };
};

export default useThemes;
