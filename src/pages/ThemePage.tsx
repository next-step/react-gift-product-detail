import { useParams } from "react-router-dom";
import { useFetchTheme } from "../hooks/useFetchTheme";
import { useThemeProduct } from "@/hooks/useThemeProduct";
import styled from "@emotion/styled";
import ThemeHeader from "@/components/theme/ThemeHeader";
import ProductGrid from "@/components/theme/ProductGrid";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function ThemePage() {
  const { themeId } = useParams();
  const { data: theme } = useFetchTheme(themeId);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useThemeProduct(themeId!);

  const queryClient = useQueryClient();

  useEffect(() => {
    // 언마운트 시 쿼리 캐시 삭제
    return () => {
      queryClient.removeQueries({
        queryKey: ["themeProduct", themeId || ""] as const,
      });
    };
  }, [themeId, queryClient]);

  const { loaderRef } = useInfiniteScroll({
    hasMore: !!hasNextPage,
    loading: isFetchingNextPage,
    fetchMore: () => {
      fetchNextPage();
    },
  });

  const products = data?.pages.flatMap((page) => page.list ?? []) ?? [];

  if (!theme || !data) return null;

  return (
    <Wrapper>
      <ThemeHeader theme={theme} />
      <ProductGrid
        products={products}
        loaderRef={loaderRef}
        isLoading={isFetchingNextPage}
      />
      {isFetchingNextPage && <Spinner />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Spinner = styled.div`
  margin: 40px auto;
  width: 25px;
  height: 25px;
  border: 4px solid #ccc;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
