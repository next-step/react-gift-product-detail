import type { ProductPage } from "@/types/product";
import baseHttp from "./baseHttp";

export const getThemeInfo = async (themeId: string) => {
  const { data } = await baseHttp.get(`/themes/${themeId}/info`);
  return data.data;
};

export const getThemeProduct = async (
  themeId: string,
  cursor = 0,
  limit = 10,
): Promise<ProductPage> => {
  const response = await baseHttp.get(`/themes/${themeId}/products`, {
    params: { cursor, limit },
  });
  return response.data.data; 
};
