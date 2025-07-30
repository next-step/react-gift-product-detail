import { useQuery } from '@tanstack/react-query';
import { getThemes } from '@/api/services';

export const useThemesQuery = () => {
  return useQuery({
    queryKey: ['themes'],
    queryFn: getThemes,
  });
};
