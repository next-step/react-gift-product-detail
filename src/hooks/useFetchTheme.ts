import QUERY_KEY from "@/constants/queryKey";
import { useFetch } from "@/hooks/useFetch";
import type { ThemeInfo } from "@/types/theme";

export function useFetchTheme(themeId?: string) {
  return useFetch<ThemeInfo>({
    queryKey: QUERY_KEY.THEME_INFO(themeId ?? ""),
    url: `/themes/${themeId}/info`,
    options: {
      enabled: !!themeId,
    },
  });
}
