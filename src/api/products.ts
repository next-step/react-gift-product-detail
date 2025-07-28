import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { Gift } from "@/types/gift";

type FetchProductsParams = {
  id: number;
};

type FetchProductsResult = Gift;

export const fetchProducts = async (
  params: FetchProductsParams,
): Promise<FetchProductsResult> => {
  return await axiosInstance.get(API_PATHS.PRODUCTS.ITEM(params.id));
};
