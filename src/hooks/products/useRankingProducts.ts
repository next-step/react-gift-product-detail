import { useSearchParams } from "react-router-dom";
import { getRankingProduct } from "@/api/product";
import { TAB_DATA, TAGS } from "@/constants";
import { parseUrlParam } from "@/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";

export const useRankingProducts = () => {
  const [searchParams] = useSearchParams();
  const selectedTag = parseUrlParam(
    searchParams.get("targetType"),
    TAGS,
    "ALL",
  );
  const selectedTab = parseUrlParam(
    searchParams.get("rankType"),
    TAB_DATA,
    "MANY_WISH",
  );

  const { data: products } = useSuspenseQuery({
    queryKey: queryKeys.products.ranking(selectedTag, selectedTab),
    queryFn: () =>
      getRankingProduct({
        targetType: selectedTag,
        rankType: selectedTab,
      }),
  });

  return {
    products: products || [],
    isEmpty: products?.length === 0,
  };
};
