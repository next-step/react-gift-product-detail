import { useQuery } from "@tanstack/react-query";
import { fetchThemes, type Theme } from "@/api/theme";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useThemes = () => {
  const {
    data: themes = [],
    isLoading: loading,
    isError,
  } = useQuery<Theme[], Error>({
    queryKey: ["themes"],
    queryFn: fetchThemes,
  });

  return {
    themes,
    loading,
    error: isError ? ERROR_MESSAGES.THEME.FAIL_TO_LOAD : null,
  };
};
