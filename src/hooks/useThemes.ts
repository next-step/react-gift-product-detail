import { useQuery } from '@tanstack/react-query';
import { getThemes } from '@/api/themes';
import type { ThemeResponse } from '@/api/types';

/**
 * 테마 목록을 조회하는 커스텀 훅 (React Query 적용)
 */
export const useThemes = () => {
  return useQuery<ThemeResponse, Error>({
    queryKey: ['themes'],
    queryFn: getThemes,
  });
};
