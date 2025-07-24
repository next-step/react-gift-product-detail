import { useQuery } from '@tanstack/react-query';
import { fetchThemes, fetchThemeDetail } from '@/api/theme';

export const useThemes = () => {
  return useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
    staleTime: 1000 * 60 * 3,
  });
};

export const useThemeDetail = (themeId: number) => {
  return useQuery({
    queryKey: ['themeDetail', themeId],
    queryFn: () => fetchThemeDetail(themeId),
    enabled: !!themeId,
    staleTime: 1000 * 60 * 3,
  });
};
