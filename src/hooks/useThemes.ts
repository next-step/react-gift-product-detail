import { useThemesQuery } from '@/api/theme/query';

/**
 * 테마 목록을 조회하는 커스텀 훅 (React Query 적용)
 */
export const useThemes = () => {
  return useThemesQuery();
};
