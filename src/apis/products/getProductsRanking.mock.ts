import API_ENDPOINTS from "@/constants/apiEndpoints";
import { productsRankingMockData } from "@/mocks/data/productsRankingMockData";
import type { ProductRankingFilterOption } from "@/types/ProductType";
import { http, HttpResponse } from "msw";
import { apiBaseUrl } from "../instance";

export const getProductsRankingHandler = [
  http.get(apiBaseUrl + API_ENDPOINTS.PRODUCTS_RANKING, async ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get("targetType");
    const rankType = url.searchParams.get("rankType");

    const filterOption: ProductRankingFilterOption = {
      targetType: targetType as ProductRankingFilterOption["targetType"],
      rankType: rankType as ProductRankingFilterOption["rankType"],
    };

    if (filterOption.targetType === "TEEN" || filterOption.rankType === "MANY_WISH_RECEIVE") {
      return HttpResponse.json({
        data: [],
      });
    }

    return HttpResponse.json({
      data: productsRankingMockData,
    });
  }),
];
