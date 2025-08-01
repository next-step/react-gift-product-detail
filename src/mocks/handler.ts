import { API_PATHS } from "@/api/apiPaths";
import { http, HttpResponse } from "msw";
import { GIFT_RANKING_DATA } from "./giftRanking.mock";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const handlers = [
  http.get(`${BASE_URL}${API_PATHS.PRODUCTS.RANKING}`, ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get("targetType") || "ALL";
    const rankType = url.searchParams.get("rankType") || "MANY_WISH";

    if (targetType === "ALL" && rankType === "MANY_WISH") {
      return HttpResponse.json({ GIFT_RANKING_DATA });
    }
  }),
];
