import { useFetch } from "@/hooks/useFetch";
import type { ThemeInfo } from "@/types/theme";

export function useFetchTheme(themeId?: string) {
  return useFetch<ThemeInfo>(
    ["themeInfo", themeId],
    themeId ? `/themes/${themeId}/info` : "", 
    undefined, 
    { enabled: !!themeId });
}
