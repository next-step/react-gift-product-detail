import { fetchThemes } from "@/api/themes";
import type { Theme } from "@/types/theme";
import { useQuery } from "@tanstack/react-query";

const useThemes = () => {
  const {
    data: presentThemes,
    isPending,
    isError,
  } = useQuery<Theme[]>({
    queryKey: ["presentThemes"],
    queryFn: fetchThemes,
  });

  return { presentThemes, isPending, isError };
};

export default useThemes;
