import { apiBaseUrl } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import { productHighlightReviewMockData } from "@/mocks/data/productHighlightReviewMockData";
import { http, HttpResponse } from "msw";

export const getProductHighlightReviewHandler = [
  http.get<{ productId: string }>(apiBaseUrl + API_ENDPOINTS.PRODUCT_HIGHLIGHT_REVIEW, async ({ params }) => {
    const { productId } = params;

    if (!productId || productId === "0") {
      return HttpResponse.json(
        {
          data: {
            status: "BAD_REQUEST",
            statusCode: 400,
            message: "존재하지 않는 상품입니다",
          },
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      data: productHighlightReviewMockData,
    });
  }),
];
