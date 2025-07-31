import { useQuery } from '@tanstack/react-query';
import { getThemes } from '@/services/theme';
import { queryKeys } from '@/constants/queryKeys';

export const useThemesQuery = () => {
  return useQuery({
    queryKey: queryKeys.themes.lists(),
    queryFn: getThemes,
  });
};
