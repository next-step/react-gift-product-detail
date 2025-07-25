import { fetchGiftRanking } from '../api/giftRanking';
import { fetchGiftThemes } from '../api/giftTheme';
import { fetchThemeInfo } from '../api/themeInfo';
import { queryKeys } from '../constants/queryKeys';
import { fetchGiftProductById } from '../hooks/useGiftProductById';

export const giftProductQueryOptions = (id: number) => ({
  queryKey: queryKeys.giftProduct(id),
  queryFn: () => fetchGiftProductById(id),
  enabled: !!id,
});

export const giftRankingQueryOptions = (
  filter: string,
  tab: string
) => ({
  queryKey: queryKeys.giftRanking(filter, tab),
  queryFn: () => fetchGiftRanking(filter, tab),
});

export const giftThemesQueryOptions = () => ({
  queryKey: queryKeys.giftThemes,
  queryFn: async () => {
    const res = await fetchGiftThemes();
    return res.data;
  },
  staleTime: 1000 * 60 * 5,
  retry: 1,
});

export const giftThemeInfoQueryOptions = (themeId: number) => ({
  queryKey: queryKeys.themeInfo(themeId),
  queryFn: () => fetchThemeInfo(themeId),
  enabled: !!themeId,
  staleTime: 1000 * 60 * 5,
  retry: 1,
});
