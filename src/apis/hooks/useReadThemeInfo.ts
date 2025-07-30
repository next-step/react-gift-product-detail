import { getThemeInfo, type GetThemeInfoParams } from '../domain/themes/getThemeInfo';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { API_QUERY_KEY } from '../query';

export const useQueryThemeInfo = (params: GetThemeInfoParams) => {
  return queryOptions({
    queryKey: API_QUERY_KEY.theme.info(params.themeId),
    queryFn: () => getThemeInfo(params),
  });
};

export const useReadThemeInfo = (params: GetThemeInfoParams) => {
  return useSuspenseQuery({
    ...useQueryThemeInfo(params),
    select: (data) => data.data.data,
  });
};
