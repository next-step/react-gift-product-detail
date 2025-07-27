import type { CategoryCardData } from '@/types/categoryCardData';
import publicClient from '../clients/publicClient';

export const getCategories = async (): Promise<CategoryCardData[]> => {
  const { data } = await publicClient.get('/api/themes');
  const categories = data.data;
  return categories;
};
