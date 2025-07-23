import { useQuery } from "@tanstack/react-query";
import { type ThemeInfo, fetchThemeInfo } from "@/api/theme";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useThemeInfo = (themeId: number | undefined) => {
  const {
    data: themeInfo,
    isLoading: loading,
    error,
  } = useQuery<ThemeInfo, string>({
    queryKey: ["themeInfo", themeId],
    queryFn: () => {
      if (!themeId) {
        return Promise.reject(ERROR_MESSAGES.THEME.INVALID);
      }
      return fetchThemeInfo(themeId);
    },
    enabled: !!themeId,
  });

  return {
    themeInfo,
    loading,
    error: error ? ERROR_MESSAGES.THEME.FAIL_TO_LOAD : null,
  };
};
