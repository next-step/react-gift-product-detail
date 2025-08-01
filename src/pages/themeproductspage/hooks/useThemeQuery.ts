import { useSuspenseApiQuery } from "@/hooks/useSuspenseApiQuery";
import { useApiQuery } from "@/hooks/useApiQuery";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";
import type { ThemeProductResponse } from "@/types/api_types";

export const useInitialThemeQuery = (themeId: string) => {
  return useSuspenseApiQuery<ThemeProductResponse>({
    url: `${API_ENDPOINTS.THEME_PRODUCTS(Number(themeId))}`,
    queryKey: ["theme-products", themeId, "initial"],
  });
};

export const useNextThemeQuery = (themeId: string, cursor: number | null) => {
  return useApiQuery<ThemeProductResponse>({
    url: `${API_ENDPOINTS.THEME_PRODUCTS(Number(themeId))}${cursor ? `?cursor=${cursor}` : ""}`,
    queryKey: ["theme-products", themeId, cursor],
    enabled: false,
  });
};
