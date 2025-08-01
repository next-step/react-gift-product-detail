import { http, HttpResponse } from "msw";
import { trendingGiftsMockData } from "@/data/trendingGfitsMockData";

export const setupDefaultDataHandler = (delay = 100) => {
  return http.get("/api/products/ranking", async () => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return HttpResponse.json({ data: trendingGiftsMockData });
  });
};

export const setupEmptyDataHandler = () => {
  return http.get("/api/products/ranking", () =>
    HttpResponse.json({ data: [] })
  );
};

export const setupErrorHandler = () => {
  return http.get("/api/products/ranking", () => HttpResponse.error());
};

export const setupApiParameterObserver = (params: {
  targetType: string | null;
  rankType: string | null;
}) => {
  return http.get("/api/products/ranking", ({ request }) => {
    const url = new URL(request.url.toString());
    params.targetType = url.searchParams.get("targetType");
    params.rankType = url.searchParams.get("rankType");

    return HttpResponse.json({ data: trendingGiftsMockData });
  });
};
