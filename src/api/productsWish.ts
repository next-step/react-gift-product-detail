import type { GiftWish } from "@/types/gift";
import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

type FetchProductsWishParams = {
  id: number;
};

type FetchProductsWishResult = GiftWish;

export const fetchProductsWish = async (
  params: FetchProductsWishParams,
): Promise<FetchProductsWishResult> => {
  return await axiosInstance.get(API_PATHS.PRODUCTS.WISH(params.id));
};
