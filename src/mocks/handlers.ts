import { postLoginHandler } from "@/apis/login/postLogin.mock";
import { getProductsRankingHandler } from "@/apis/products/getProductsRanking.mock";
import { getProductSummaryHandler } from "@/apis/products/getProductSummary.mock";
import { postOrderHandler } from "@/apis/order/postOrder.mock";

export const handlers = [
  ...getProductsRankingHandler,
  ...postLoginHandler,
  ...getProductSummaryHandler,
  ...postOrderHandler,
];
