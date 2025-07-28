import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { GiftReviews } from "@/types/gift";

type FetchProductsReviewParams = {
  id: number;
};

type FetchProductsReviewResult = GiftReviews;

export const fetchProductsReview = async (
  params: FetchProductsReviewParams,
): Promise<FetchProductsReviewResult> => {
  return await axiosInstance.get(API_PATHS.PRODUCTS.REVIEW(params.id));
};
