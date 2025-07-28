import axios from "axios";
import { END_POINTS } from "./endPoints";
import type { GiftThemeType } from "@/types/GiftThemeType";
import type { TrendingGiftsType } from "@/types/TrendingGiftsType";
import type { User } from "@/types/User";
import type { ProductInfoSummary } from "@/types/ProductInfoSummary";
import type { Order } from "@/types/Order";
import type { ThemeInfo } from "@/types/ThemeInfo";
import type { ThemeProduct, ThemeProducts } from "@/types/ThemeProducts";
import type { Wish } from "@/types/Wish";
import type { ProductHighlightReview } from "@/types/HighlighReview";
import type { ProductDetailInfo } from "@/types/ProductDetail";
import { CATEGORY_ERROR_MESSAGE } from "@/pages/HomePage/components/Category/constants/labels";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getThemes = async (): Promise<GiftThemeType[]> => {
  return await apiClient.get(END_POINTS.THEMES);
};

export const getValidThemes = async (): Promise<GiftThemeType[]> => {
  const response = await getThemes();

  if (response.length === 0) {
    throw new Error(CATEGORY_ERROR_MESSAGE.EMPTY_DATA_ERROR);
  }

  return response;
};

export const getTrendingGifts = async (
  targetType: string,
  rankType: string
): Promise<TrendingGiftsType[]> => {
  return await apiClient.get(END_POINTS.RANKING, {
    params: {
      targetType,
      rankType,
    },
  });
};

export const getUserInfo = async (
  email: string,
  password: string
): Promise<User> => {
  return await apiClient.post(END_POINTS.LOGIN, {
    email,
    password,
  });
};

export const getProductInfo = async (
  id: string
): Promise<ProductInfoSummary> => {
  return await apiClient.get(END_POINTS.PRODUCT_INFO.replace(":id", id));
};

export const createOrder = async (authToken: string, order: Order) => {
  return await apiClient.post(END_POINTS.ORDER, order, {
    headers: {
      Authorization: authToken,
    },
  });
};

export const getThemeInfo = async (themeId: number): Promise<ThemeInfo> => {
  return await apiClient.get(
    END_POINTS.THEME_INFO.replace(":themeId", themeId.toString())
  );
};

export const getThemeProducts = async (
  themeId: number,
  cursor: number
): Promise<ThemeProducts> => {
  return await apiClient.get(
    END_POINTS.THEME_PRODUCTS.replace(":themeId", themeId.toString()).replace(
      ":cursor",
      cursor.toString()
    )
  );
};

export const getProductDetail = async (
  productId: string
): Promise<ThemeProduct> => {
  return await apiClient.get(
    END_POINTS.PRODUCT_DETAIL.replace(":productId", productId)
  );
};

export const getProductWish = async (productId: string): Promise<Wish> => {
  return await apiClient.get(
    END_POINTS.PRODUCT_WISH.replace(":productId", productId)
  );
};

export const getProductHighlightReview = async (
  productId: string
): Promise<ProductHighlightReview> => {
  return await apiClient.get(
    END_POINTS.PRODUCT_HIGHLIGHT_REVIEW.replace(":productId", productId)
  );
};

export const getProductDetailInfo = async (
  productId: string
): Promise<ProductDetailInfo> => {
  return await apiClient.get(
    END_POINTS.PRODUCT_DETAIL_INFO.replace(":productId", productId)
  );
};
