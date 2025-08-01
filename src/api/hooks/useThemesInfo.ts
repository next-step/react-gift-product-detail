import { fetchThemesInfo } from "@/api/themesInfo";
import type { ThemeInfo } from "@/types/theme";
import { useSuspenseQuery } from "@tanstack/react-query";

type ThemesInfoParams = {
  id: string | undefined;
};

const useThemesInfo = ({ id }: ThemesInfoParams) => {
  const { data: themeInfoData, isError } = useSuspenseQuery<ThemeInfo>({
    queryKey: ["themeInfo", id],
    queryFn: () => fetchThemesInfo({ themeId: Number(id) }),
  });

  return { themeInfoData, isError };
};

export default useThemesInfo;
