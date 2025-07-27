import { BE } from "@src/apis/BackEnd/apiEndPoints";
import { http, HttpResponse } from "msw";
import { productMockData } from "../productMockData";

export const handlers = [
  http.get(BE.API.PRODUCT.RANKING, () => {
    return HttpResponse.json({ data: [productMockData] });
  })
];
