import { postLoginHandler } from "@/apis/login/postLogin.mock";
import { getProductsRankingHandler } from "@/apis/products/getProductsRanking.mock";
import { getProductSummaryHandler } from "@/apis/products/getProductSummary.mock";
import { postOrderHandler } from "@/apis/order/postOrder.mock";
import { getProductInfoHandler } from "@/apis/products/getProductInfo.mock";
import { getProductDetailHandler } from "@/apis/products/getProductDetail.mock";
import { getProductHighlightReviewHandler } from "@/apis/products/getProductHighlightReview.mock";
import { getProductWishHandler } from "@/apis/products/getProductWish.mock";

export const handlers = [
  ...getProductsRankingHandler,
  ...postLoginHandler,
  ...getProductSummaryHandler,
  ...postOrderHandler,
  ...getProductInfoHandler,
  ...getProductDetailHandler,
  ...getProductHighlightReviewHandler,
  ...getProductWishHandler,
];
