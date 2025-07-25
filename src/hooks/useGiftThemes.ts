import { useQuery } from '@tanstack/react-query';
import { type GiftTheme } from '../types/GiftTheme';
import { giftThemesQueryOptions } from '../query/queryOptions';

export const useGiftThemes = () => {
  return useQuery<GiftTheme[], Error>(giftThemesQueryOptions());
};
