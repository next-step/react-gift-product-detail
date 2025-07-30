import { fetchThemeInfo, fetchThemes } from '@apis/themeApi';
import { queryOptions } from '@tanstack/react-query';

export const themeOptions = () => {
  return queryOptions({
    queryKey: ['Themes'],
    queryFn: fetchThemes,
  });
};

export const themeHeroInfoOptions = (id: string) => {
  return queryOptions({
    queryKey: ['themeHeroInfo', id],
    queryFn: ({ queryKey }) => fetchThemeInfo(queryKey[1]),
  });
};
