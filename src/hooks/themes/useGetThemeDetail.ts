import { getThemeInfo } from "@/api/themes/get-theme-info";
import { useRouter } from "@/hooks/common/useRouter";
import { queryKeys } from "@/lib/query-keys";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetThemeDetail = (themeId: number) => {
  const { data } = useSuspenseQuery({
    queryKey: queryKeys.themes.detail(themeId),
    queryFn: () => getThemeInfo(themeId),
  });
  const { goHomePage } = useRouter();

  useEffect(() => {
    if (!themeId || isNaN(themeId)) {
      goHomePage();
      return;
    }
  }, [themeId, goHomePage]);

  return {
    data,
  };
};
