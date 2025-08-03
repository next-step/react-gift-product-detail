import { useSuspenseQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/axios';
import type { Result } from '@/types/CommonTypes';

export interface Theme {
  themeId: number;
  name: string;
  image: string;
}

const fetchThemes = async (): Promise<Theme[]> => {
  const res = await apiGet<Result<Theme[]>>('/themes');

  if (!res || !res.data || !Array.isArray(res.data)) {
    console.error('Invalid theme response:', res);
    return [];
  }

  return res.data;
};

export const useThemes = (): Theme[] => {
  const { data } = useSuspenseQuery<Theme[]>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
    staleTime: 1000 * 60 * 5,
  });

  return data ?? [];
};
