import { useQuery } from "@tanstack/react-query";
import { getThemeInfo } from "@/services/theme";

export function useFetchTheme(themeId?: string) {
  return useQuery({
    queryKey: ["themeInfo", themeId],
    queryFn: () => getThemeInfo(themeId!),
    enabled: !!themeId,
  });
}
