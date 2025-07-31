import { postLoginHandler } from "@/apis/login/postLogin.mock";
import { getProductsRankingHandler } from "@/apis/products/getProductsRanking.mock";

export const handlers = [...getProductsRankingHandler, ...postLoginHandler];
