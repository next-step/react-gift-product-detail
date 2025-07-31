import API_ENDPOINTS from "@/constants/apiEndpoints";
import { productsRankingMockData } from "@/mocks/data/productsRankingMockData";
import { http, HttpResponse } from "msw";
import { apiBaseUrl } from "../instance";

export const getProductsRankingHandler = [
  http.get(apiBaseUrl + API_ENDPOINTS.PRODUCTS_RANKING, () => {
    return HttpResponse.json({
      data: productsRankingMockData,
    });
  }),
];
