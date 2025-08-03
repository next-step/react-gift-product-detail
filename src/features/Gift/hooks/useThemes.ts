import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

interface Theme {
  themeId: number;
  name: string;
  image: string;
}

const fetchThemes = async (): Promise<Theme[]> => {
  const response = await api.get('/themes');
  return response.data.data;
};

export const useThemes = () => {
  const { data, isLoading, error } = useQuery<Theme[]>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
    staleTime: 1000 * 60 * 5,
  });

  return {
    themes: data ?? [],
    loading: isLoading,
    error,
  };
};
