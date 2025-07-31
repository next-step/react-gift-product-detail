import { LoadingSpinner } from "@/components/common";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { MainPageErrorFallback } from "@/components/error/MainPageErrorFallback";
import {
  CheerUpSection,
  HotGiftRanking,
  PresentTheme,
  SelectFriendSection,
} from "@/components/main";
import { queryKeys } from "@/lib/query-keys";
import { queryClient } from "@/query-client";
import { Suspense } from "react";

export const MainPage = () => {
  const handleThemeRetry = () => {
    queryClient.refetchQueries({ queryKey: queryKeys.themes.lists() });
  };

  const handleRankingRetry = () => {
    queryClient.refetchQueries({ queryKey: queryKeys.products.rankings() });
  };
  return (
    <>
      <SelectFriendSection />
      <ErrorBoundary
        fallback={reset => (
          <MainPageErrorFallback
            onRetry={() => {
              handleThemeRetry();
              reset();
            }}
            title="선물 테마를 불러올 수 없습니다."
          />
        )}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <PresentTheme />
        </Suspense>
      </ErrorBoundary>
      <CheerUpSection />
      <ErrorBoundary
        fallback={reset => (
          <MainPageErrorFallback
            onRetry={() => {
              handleRankingRetry();
              reset();
            }}
            title="실시간 급상승 선물랭킹을 불러올 수 없습니다."
          />
        )}
      >
        <HotGiftRanking />
      </ErrorBoundary>
    </>
  );
};
