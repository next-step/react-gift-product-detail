import { useSuspenseApiQuery } from "@/hooks/useSuspenseApiQuery";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";
import type { ThemeInfo } from "@/types/api_types";

export function useThemeInfo(themeId: number | null) {
  const enabled = !!themeId;
  const { data } = useSuspenseApiQuery<ThemeInfo>({
    url: enabled ? API_ENDPOINTS.THEME_INFO(themeId!) : "",
    queryKey: [API_ENDPOINTS.THEME_INFO(themeId ?? 0), themeId],
  });
  return { data };
}
