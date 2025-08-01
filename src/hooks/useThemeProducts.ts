import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";
import type { CardItem, CardItemData } from "@/types/DTO/productDTO";
import type { ApiError } from "@/types/error";
import { RouterPath } from "@/routes/path";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useGetThemeInfo } from "@/hooks/useGetThemeInfo";
import { useGetThemeProducts } from "@/hooks/useGetThemeProducts";

interface ThemeProductsResponse {
  list: CardItemData[];
  cursor: number;
  hasMoreList: boolean;
}

export function useThemeProducts(themeId: number | undefined) {
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data: theme, error: themeError } = useGetThemeInfo(themeId || 0);
  const {
    data: productsData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetThemeProducts(themeId || 0) as {
    data: { pages: ThemeProductsResponse[] } | undefined;
    isLoading: boolean;
    hasNextPage: boolean | undefined;
    fetchNextPage: () => void;
    isFetchingNextPage: boolean;
  };

  useEffect(() => {
    if (themeError) {
      const apiError = themeError as ApiError;
      if (apiError?.response?.status === HttpStatusCode.NotFound) {
        navigate(RouterPath.HOME, { replace: true });
      }
    }
  }, [themeError, navigate]);

  const products: CardItem[] =
    productsData?.pages?.flatMap((page: ThemeProductsResponse) =>
      page.list.map((product: CardItemData) => ({
        id: product.id,
        imageUrl: product.imageURL,
        brand: product.brandInfo.name,
        name: product.name,
        price: product.price.sellingPrice,
      }))
    ) || [];

  useInfiniteScroll({
    targetRef: observerRef,
    hasMore: hasNextPage || false,
    isLoading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  return {
    theme,
    products,
    loading: isLoading,
    hasMoreList: hasNextPage || false,
    observerRef,
  };
}
