import { useFetch } from "@/hooks/useFetch";
import type { ThemeInfo } from "@/types/theme";

export function useFetchTheme(themeId?: string) {
  return useFetch<ThemeInfo>({
    queryKey: ["themeInfo", themeId],
    url: `/themes/${themeId}/info`,
    options: {
      enabled: !!themeId,
    },
  });
}
