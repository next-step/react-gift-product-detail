import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchThemes, type Theme } from "@/api/theme";

export const useThemes = () => {
  const { data: themes } = useSuspenseQuery<Theme[]>({
    queryKey: ["themes"],
    queryFn: fetchThemes,
  });

  return {
    themes,
  };
};
