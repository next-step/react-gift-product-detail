import { useQuery } from '@tanstack/react-query';
import { fetchThemes, type Category } from '@/api/themes';

const useGiftThemes = () => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery<Category[], Error>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  return { categories: categories || [], isLoading, isError, error };
};

export default useGiftThemes;
