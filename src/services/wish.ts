import baseHttp from "./baseHttp";
import { API } from "@/constants/api";
import type { WishResponse } from "@/hooks/useProductWish";

export const updateWish = async (productId: string): Promise<WishResponse> => {
  const response = await baseHttp.get<{ data: WishResponse }>(
    API.PRODUCT_WISH(productId),
  );
  return response.data.data;
};
