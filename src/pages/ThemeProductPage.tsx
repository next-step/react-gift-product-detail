import { LoadingSpinner } from "@/components/common";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { MainPageErrorFallback } from "@/components/error/MainPageErrorFallback";
import {
  ThemeProductGrid,
  ThemeProductHero,
  ThemeProductPageLayout,
} from "@/components/themes";
import { queryKeys } from "@/lib/query-keys";
import { queryClient } from "@/query-client";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

export const ThemeProductPage = () => {
  const { id: themeId } = useParams<{ id: string }>();
  const handleRetry = () => {
    const themeIdNum = Number(themeId);

    queryClient.refetchQueries({
      queryKey: queryKeys.themes.detail(themeIdNum),
    });
    queryClient.refetchQueries({
      queryKey: queryKeys.themes.productList(themeIdNum, 10),
    });
  };

  return (
    <ThemeProductPageLayout>
      <ErrorBoundary
        fallback={reset => (
          <MainPageErrorFallback
            onRetry={() => {
              handleRetry();
              reset();
            }}
            title="테마 정보를 불러올 수 없습니다."
          />
        )}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ThemeProductHero themeId={Number(themeId)} />
          <ThemeProductGrid themeId={Number(themeId)} />
        </Suspense>
      </ErrorBoundary>
    </ThemeProductPageLayout>
  );
};
