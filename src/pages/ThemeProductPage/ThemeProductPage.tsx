import { getThemeInfo, getThemeProducts } from "@/data/api";
import Layout from "@/layout";
import { Navigate, useParams } from "react-router-dom";
import { Loading } from "@/components/Loading/Loading";
import {
  HeroDescription,
  HeroName,
  HeroSection,
  HeroTitle,
} from "./HeroSection";
import { ROUTES } from "@/constants/routes";
import type { ThemeInfo } from "@/types/ThemeInfo";
import { Suspense, useRef, useState } from "react";
import ThemeProductsGrid from "./ThemeProductsGrid";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import { OBSERVER_OPTIONS } from "./constants/observer";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKey";
import ErrorBoundary from "@/components/Error/ErrorBoundary/ErrorBoundary";

function ThemeProductsContent({ themeInfo }: { themeInfo: ThemeInfo }) {
  const loader = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<number>(0);

  const { data, isLoading: isThemeProductsLoading } = useQuery({
    queryKey: QUERY_KEY.THEME_PRODUCTS(themeInfo.themeId, cursor),
    queryFn: () => getThemeProducts(Number(themeInfo.themeId), cursor),
    retry: false,
  });

  const { themeProducts } = useInfiniteScroll({
    data: data ?? { list: [], cursor: 0, hasMoreList: false },
    isLoading: isThemeProductsLoading,
    loaderRef: loader,
    setCursor,
    observerOptions: {
      threshold: OBSERVER_OPTIONS.THRESHOLD,
    },
  });

  return (
    <>
      <HeroSection backgroundColor={themeInfo?.backgroundColor || ""}>
        <HeroName>{themeInfo?.name}</HeroName>
        <HeroTitle>{themeInfo?.title}</HeroTitle>
        <HeroDescription>{themeInfo?.description}</HeroDescription>
      </HeroSection>
      <ThemeProductsGrid
        themeProducts={themeProducts}
        isThemeProductsLoading={isThemeProductsLoading}
        isLoaderRef={loader as React.RefObject<HTMLDivElement>}
      />
    </>
  );
}

function ThemeProductQueryContent() {
  const { themeId } = useParams();

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.THEME_INFO(themeId),
    queryFn: () => getThemeInfo(Number(themeId)),
    retry: false,
  });

  return <ThemeProductsContent themeInfo={data!} />;
}

export function ThemeProductPage() {
  return (
    <Layout>
      <ErrorBoundary fallback={<Navigate to={ROUTES.HOME} replace />}>
        <Suspense fallback={<Loading />}>
          <ThemeProductQueryContent />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

export default ThemeProductPage;
