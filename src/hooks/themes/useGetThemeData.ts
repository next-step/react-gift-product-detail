import { useSuspenseQuery } from "@tanstack/react-query";
import { getThemes } from "@/api/themes";
import { queryKeys } from "@/lib/query-keys";

export const useGetThemeData = () => {
  const { data: themes } = useSuspenseQuery({
    queryKey: queryKeys.themes.lists(),
    queryFn: getThemes,
  });

  return {
    themes,
    isEmpty: themes.length === 0,
  };
};
