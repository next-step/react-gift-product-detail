import { apiBaseUrl } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import { http, HttpResponse } from "msw";

export const getProductSummaryHandler = [
  http.get<{ productId: string }>(apiBaseUrl + API_ENDPOINTS.PRODUCT_SUMMARY, async ({ params }) => {
    const { productId } = params;

    if (!productId || productId === "0") {
      return HttpResponse.json(
        {
          data: {
            status: "BAD_REQUEST",
            statusCode: 400,
            message: "현재 없는 상품입니다.",
          },
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      data: {
        id: 11526198,
        name: "스트로베리 초콜릿 생크림",
        brandName: "투썸플레이스",
        price: 39000,
        imageURL: "https://example.com/image.jpg",
      },
    });
  }),
];
