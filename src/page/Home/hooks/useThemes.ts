import { requests } from '@/api/requests';
import type { ThemeInfo } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useThemes = () => {
  const { data, error, isLoading } = useQuery<ThemeInfo[]>({
    queryKey: ['themeDatas'],
    queryFn: requests.fetchTheme,
  });

  return { themes: data, isLoading, error };
};

export default useThemes;
