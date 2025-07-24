import { useQuery } from "@tanstack/react-query";
import { getThemes } from "@/api/themes";

export const useGetThemeData = () => {
  const {
    data: themes,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["themes"],
    queryFn: getThemes,
  });

  return {
    themes: themes || [],
    loading,
    error,
    isEmpty: (themes?.length ?? 0) === 0,
  };
};
