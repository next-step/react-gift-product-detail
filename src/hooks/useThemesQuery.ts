import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchThemes, type Theme } from "@/apis/fetchThemes";

export function useThemesQuery() {
  return useSuspenseQuery<Theme[]>({
    queryKey: ["themes"],
    queryFn: fetchThemes,
  });
}
