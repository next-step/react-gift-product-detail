import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { GiftSummary } from "@/types/gift";

type FetchProductsSummaryParams = {
  id: number;
};

type FetchProductsSummaryResult = GiftSummary;

export const fetchProductsSummary = async (
  params: FetchProductsSummaryParams,
): Promise<FetchProductsSummaryResult> => {
  return await axiosInstance.get(API_PATHS.PRODUCTS.SUMMARY(params.id));
};
