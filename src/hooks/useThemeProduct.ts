import { useInfiniteQuery } from "@tanstack/react-query";
import { getThemeProduct } from "@/services/theme";
import type { ProductPage } from "@/types/product";

export function useThemeProduct(themeId: string) {
  return useInfiniteQuery<ProductPage, Error>({
    queryKey: ["themeProduct", themeId],
    queryFn: ({ pageParam }) =>
      getThemeProduct(themeId, (pageParam as number) ?? 0),
    getNextPageParam: (lastPage) =>
      lastPage.hasMoreList ? lastPage.cursor : undefined,
    initialPageParam: 0,
  });
}
