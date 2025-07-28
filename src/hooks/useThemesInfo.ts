import { fetchThemesInfo } from "@/api/themesInfo";
import type { ThemeInfo } from "@/types/theme";
import { useQuery } from "@tanstack/react-query";

type ThemesInfoParams = {
  id: string | undefined;
};

const useThemesInfo = ({ id }: ThemesInfoParams) => {
  const {
    data: themeInfoData,
    isPending,
    isError,
  } = useQuery<ThemeInfo>({
    queryKey: ["themeInfo", id],
    queryFn: () => fetchThemesInfo({ themeId: Number(id) }),
    enabled: !!id,
  });

  return { themeInfoData, isPending, isError };
};

export default useThemesInfo;
