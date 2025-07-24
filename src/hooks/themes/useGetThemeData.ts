import { useQuery } from "@tanstack/react-query";
import { getThemes } from "@/api/themes";
import { queryKeys } from "@/lib/query-keys";

export const useGetThemeData = () => {
  const {
    data: themes,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: queryKeys.themes.list(),
    queryFn: getThemes,
  });

  return {
    themes: themes || [],
    loading,
    error,
    isEmpty: (themes?.length ?? 0) === 0,
  };
};
