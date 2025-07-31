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
  const themeIdNum = Number(themeId);
  const handleThemeRetry = () => {
    queryClient.refetchQueries({
      queryKey: queryKeys.themes.detail(themeIdNum),
    });
  };
  const handleThemeProductRetry = () => {
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
              handleThemeRetry();
              reset();
            }}
            title="테마 정보를 불러올 수 없습니다."
          />
        )}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ThemeProductHero themeId={Number(themeId)} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary
        fallback={reset => (
          <MainPageErrorFallback
            onRetry={() => {
              handleThemeProductRetry();
              reset();
            }}
            title="테마 상품을 불러올 수 없습니다."
          />
        )}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ThemeProductGrid themeId={Number(themeId)} />
        </Suspense>
      </ErrorBoundary>
    </ThemeProductPageLayout>
  );
};
