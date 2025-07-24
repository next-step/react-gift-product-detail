import { getThemeInfo, getThemeProducts } from "@/data/api";
import Layout from "@/layout";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "@/components/Loading/Loading";
import {
  HeroDescription,
  HeroName,
  HeroSection,
  HeroTitle,
} from "./HeroSection";
import { ROUTES } from "@/constants/routes";
import type { ThemeInfo } from "@/types/ThemeInfo";
import { useRef, useState } from "react";
import ThemeProductsGrid from "./ThemeProductsGrid";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import { OBSERVER_OPTIONS } from "./constants/observer";
import { useQuery } from "@tanstack/react-query";

function ThemeProductsContent({ themeInfo }: { themeInfo: ThemeInfo }) {
  const loader = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<number>(0);

  const { data, isLoading: isThemeProductsLoading } = useQuery({
    queryKey: ["themeProducts", themeInfo.themeId, cursor],
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

function ThemeProductPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["themeInfo", params.themeId],
    queryFn: () => getThemeInfo(Number(params.themeId)),
    retry: false,
  });

  if (isError) {
    navigate(ROUTES.HOME);
  }

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        data && <ThemeProductsContent themeInfo={data} />
      )}
    </Layout>
  );
}

export default ThemeProductPage;
