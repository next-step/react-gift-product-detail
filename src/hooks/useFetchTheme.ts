import { useQuery } from "@tanstack/react-query";
import { getThemeInfo } from "@/services/theme";
import type { ThemeInfo } from "@/types/theme";

export function useFetchTheme(themeId?: string) {
  return useQuery<ThemeInfo>({
    queryKey: ["themeInfo", themeId],
    queryFn: () => getThemeInfo(themeId!),
    enabled: !!themeId,
  })
}
