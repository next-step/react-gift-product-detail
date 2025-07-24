import { ApiError } from "@/api/custom-error";
import { getThemeInfo } from "@/api/themes/get-theme-info";

import { useRouter } from "@/hooks/common/useRouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetThemeDetail = (themeId: number) => {
  const {
    data,
    error,
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["themeInfo", themeId],
    queryFn: () => getThemeInfo(themeId),
    enabled: !!(themeId && !isNaN(themeId)),
  });
  const { goHomePage } = useRouter();

  useEffect(() => {
    if (!themeId || isNaN(themeId)) {
      goHomePage();
      return;
    }

    if (isError && error instanceof ApiError && error.statusCode === 404) {
      goHomePage();
    }
  }, [themeId, isError, error, goHomePage]);

  return {
    data: data || null,
    error,
    loading,
  };
};
