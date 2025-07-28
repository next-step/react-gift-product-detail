import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchThemes, type Category } from '@/api/themes';

const useGiftThemes = () => {
  const {
    data: categories,
  } = useSuspenseQuery<Category[], Error>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  return { categories: categories || [] };
};

export default useGiftThemes;
