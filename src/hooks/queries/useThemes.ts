import { useQuery } from '@tanstack/react-query';
import { fetchThemes } from '@/api/theme';
import type { Theme } from '@/api/theme';

export const useThemes = () => {
  return useQuery<Theme[], Error>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });
};
