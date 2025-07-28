import { BE } from "@src/apis/BackEnd/apiEndPoints";
import { http, HttpResponse } from "msw";
import { productMockData } from "@src/mock/productMockData";

const productRanking = http.get(BE.API.PRODUCT.RANKING, () => {
  return HttpResponse.json({ data: [productMockData] });
});

export default productRanking;
