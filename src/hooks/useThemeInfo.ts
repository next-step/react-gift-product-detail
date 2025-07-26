import { useSuspenseQuery } from "@tanstack/react-query";
import { type ThemeInfo, fetchThemeInfo } from "@/api/theme";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useThemeInfo = (themeId: number | undefined) => {
  if (!themeId) {
    throw new Error(ERROR_MESSAGES.THEME.INVALID);
  }

  const { data: themeInfo } = useSuspenseQuery<ThemeInfo>({
    queryKey: ["themeInfo", themeId],
    queryFn: () => fetchThemeInfo(themeId),
  });

  return {
    themeInfo,
  };
};
