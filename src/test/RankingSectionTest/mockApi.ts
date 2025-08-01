import { http, HttpResponse } from "msw";
import { mockProducts } from "@/test/RankingSectionTest/mockProducts";

export const mockApi = [
  http.get("*/products/ranking*", ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get("targetType") || "ALL";
    const rankType = url.searchParams.get("rankType") || "MANY_WISH";

    const filteredData = mockProducts.filter(
      (p) => p.targetType === targetType && p.rankType === rankType
    );

    return HttpResponse.json({
      data: filteredData,
    });
  }),
];
