import { useQuery } from "@tanstack/react-query";
import { fetchThemes, type Theme } from "@/apis/fetchThemes";

export function useThemesQuery() {
  return useQuery<Theme[]>({
    queryKey: ["themes"],
    queryFn: fetchThemes,
  });
}
