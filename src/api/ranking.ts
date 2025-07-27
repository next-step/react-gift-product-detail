import type { GenderFilter, RankingType, Product } from "../types/ranking";
import { useQuery } from "@tanstack/react-query";

const targetTypeMap: Record<GenderFilter, string> = {
  all: "ALL",
  male: "MALE",
  female: "FEMALE",
  teen: "TEEN",
};

const rankTypeMap: Record<RankingType, string> = {
  wanted: "MANY_WISH",
  given: "MANY_RECEIVE",
  wished: "MANY_WISH_RECEIVE",
};

// 기존 API 함수 (React Query hook에서 사용)
export const fetchRankingProducts = async (
  filter: GenderFilter,
  rankingType: RankingType,
): Promise<Product[]> => {
  const url = `/api/products/ranking?targetType=${targetTypeMap[filter]}&rankType=${rankTypeMap[rankingType]}`;

  const res = await fetch(url);
  const data = await res.json();
  console.log("[API] /api/products/ranking 응답:", data);
  if (!res.ok) throw new Error("API Error");

  const productsData = Array.isArray(data) ? data : data.data || [];
  return productsData;
};

// React Query Hook
export const useRankingProducts = (filter: GenderFilter, rankingType: RankingType) => {
  return useQuery({
    queryKey: ['ranking', 'products', filter, rankingType],
    queryFn: () => fetchRankingProducts(filter, rankingType),
  });
};
