import { useSuspenseQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/axios';

export interface Theme {
  themeId: number;
  name: string;
  image: string;
}

const fetchThemes = async (): Promise<Theme[]> => {
  const res = await apiGet<Theme[]>('/themes');
  return res;
};

export const useThemes = (): Theme[] => {
  const { data } = useSuspenseQuery<Theme[]>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
