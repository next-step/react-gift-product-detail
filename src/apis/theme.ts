import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BASE_API_URL } from './index';

export type Category = {
  themeId: number;
  name: string;
  image: string;
};

export const fetchThemes = async (): Promise<Category[]> => {
  const response = await axios.get(`${BASE_API_URL}/api/themes`);
  const responseData = response.data;

  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (responseData && Array.isArray(responseData.data)) {
    return responseData.data;
  }

  throw new Error('Unexpected API response structure');
};

export const useThemeCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
    staleTime: 1000 * 60 * 5,
  });
};
