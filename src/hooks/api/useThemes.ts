import { fetchThemes } from "@/api/themes";
import type { Theme } from "@/types/theme";
import { useSuspenseQuery } from "@tanstack/react-query";

const useThemes = () => {
  const { data: presentThemes, isError } = useSuspenseQuery<Theme[]>({
    queryKey: ["presentThemes"],
    queryFn: fetchThemes,
  });

  return { presentThemes, isError };
};

export default useThemes;
