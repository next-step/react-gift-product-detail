import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getThemes } from '../domain/themes/getThemes';
import { API_QUERY_KEY } from '../query';

export const useQueryThemes = () => {
  return queryOptions({
    queryKey: API_QUERY_KEY.theme.category,
    queryFn: getThemes,
  });
};

export const useReadThemes = () => {
  return useSuspenseQuery({
    ...useQueryThemes(),
    select: (data) => data.data.data,
  });
};
