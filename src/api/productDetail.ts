import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { GiftDetail } from "@/types/gift";

type FetchProductsDetailParams = {
  id: number;
};

type FetchProductsDetailResult = GiftDetail;

export const fetchProductsDetail = async (
  params: FetchProductsDetailParams,
): Promise<FetchProductsDetailResult> => {
  return await axiosInstance.get(API_PATHS.PRODUCTS.DETAIL(params.id));
};
